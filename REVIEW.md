# Pokemon App `src/` Review

Overall: the structure is solid for a first React project. Components are split sensibly, state is immutable (`[...prev, new]`, `filter`), keys are stable ids, and props flow down with callbacks flowing up. The issues below are mostly "React gotchas" worth learning early. Ordered by importance.

## Bugs / likely-wrong behavior

### 1. Side effects inside a state updater (`App.jsx:33-39`, `20-30`)
`addCard` calls `setCard(updaterFn)`, and inside that function you call `setNewTeamErr(...)` (which calls `setTeamErr` and `setTimeout`). Updater functions must be **pure**. In `StrictMode` (which `main.jsx` enables) React runs updaters twice in dev to catch this, so you get two state updates and two timeouts per error.

`buildNewCardArr` also **mutates its argument** (`newCard.name = ...`, line 28).

Fix: do the checks in `addCard` using the current `pokeCards`, outside the updater:
```jsx
function addCard(newCard) {
  if (pokeCards.length >= 6) return setNewTeamErr('Limit reached, remove a Pokemon first.');
  if (pokeCards.some((c) => c.id === newCard.id)) return setNewTeamErr('Already have this card.');
  setCard([...pokeCards, { ...newCard, name: capitalize(newCard.name) }]);
}
```
(If you ever add cards from async callbacks that may be stale, use the functional form but keep it pure.)

### 2. Starter fetch runs twice in dev, causing a duplicate-card error on load (`NameForm.jsx:7-11`)
`StrictMode` mounts, unmounts, and remounts components in dev, so this effect fires twice. The second batch of requests resolves to already-present cards, which triggers "Already have this card." right on page load. It is invisible in production, which is what makes it confusing.

Fix: add a cleanup/ignore flag (or `AbortController`) to the effect, or better, move starter loading into `App` (see #5).

### 3. `Types.jsx` is broken and unused
- `axios` is never imported, so calling `getPokemonTypes` would throw a `ReferenceError`.
- `getPokemonTypes` is never called and the `<ul>` is never populated.
- The component isn't imported anywhere.

Either finish it (import axios, `useEffect` + `useState` to fetch and map into `<li>`s) or delete it for now.

### 4. Timeouts are never cleaned up (`App.jsx:11-16`, `NameForm.jsx:13-18`)
Two errors in quick succession: the first timeout clears the second error early. If the component unmounts, the timeout still fires. Store the timer id in a `useRef` and `clearTimeout` before setting a new one, or use a `useEffect` keyed on the error with a cleanup.

## Design / React-idiom suggestions

### 5. Data fetching lives in the form component
`NameForm` fetches and then hands raw data up via `onPokeData`. A more conventional split: the form only reports the typed name (`onSearch(name)`), and `App` (or a small `usePokemon` hook / `api.js`) owns the fetching, the error state, and the team list. That also removes the need for two separate error states and puts the starter-loading effect next to the state it affects.

### 6. Storing the entire API response in state
`pokemon` objects from PokeAPI are huge (moves, abilities, every sprite). The card only uses `id`, `name`, `types`, `sprites.front_default`, `stats`. Map to a small object when adding:
```js
{ id, name, sprite: sprites.front_default, types: types.map(t => t.type.name), stats: stats.map(s => ({ name: s.stat.name, value: s.base_stat })) }
```
This also makes `PokemonCard` simpler and easier to test.

### 7. Error handling UX (`NameForm.jsx:41-46`)
- `alert()` blocks the UI and bypasses your existing `.error` pattern. Use `createFormErr`.
- A 404 (typo'd name) and a network failure produce the same message. Check `err.response?.status === 404` for "Pokemon not found".
- `event.target.reset()` runs before the request finishes, so the input clears even if the search fails. Probably fine, but worth knowing.
- No loading state; the user gets no feedback while waiting.

### 8. Minor correctness / robustness
- `sprites.front_default` can be `null` for some Pokemon; guard or show a fallback.
- `name.trim().toLowerCase()` is good. Consider `encodeURIComponent(name)` in the URL.
- `removeCard` guard `if (pokeCards.length >= 1)` is unnecessary; `filter` on an empty array is already fine.
- `pokeCards.length > 0 && (...)` around the `.map` is unnecessary; mapping an empty array renders nothing.
- `useState` setter naming: `[pokeCards, setCard]` should be `setPokeCards` by convention.
- `PokemonCard` `<button>` has no `type`; add `type="button"` (harmless today, bites inside forms later).
- The card's `id={name + "-card"}` is fine for Cypress selectors, but note it's built from the capitalized name that `App` mutates in, e.g. `Pikachu-card`. Make sure your tests expect that.

## Accessibility / HTML

- `App.jsx:56`: an empty `<button>` that changes the heading to "Team Builder... Day 2". It has no text or `aria-label`, so it is invisible to screen readers (and probably to users). Looks like leftover experimentation; remove it, or label it if intentional. The `heading` state can go away with it.
- `NameForm.jsx:58`: error uses `<h6>`. It isn't a heading; use `<p className="error" role="alert">` (as you did in `App`). Same `role="alert"` would help for `#team-error`.
- `PokemonCard`: `alt={name + " card image"}` could just be the name ("Pikachu"). `<sub>` is for subscripts, not subtitles; `<p>`/`<span>` with a class is more correct.
- `<header>` inside `<section>` is valid, but the one inside `.card` plus a bare `<p>` for the Pokemon name would be better as a heading (`<h3>`).
- The logo `<img>` is hotlinked from Wikimedia with tracking query params; consider downloading it to `src/assets/` or trimming the URL.

## Cleanup

- Remove `console.log`s (`NameForm.jsx:24, 26, 40, 45`).
- `PokemonCard.jsx` uses a named function plus `export default` at the bottom while `NameForm` uses `export default function`. Pick one style.
- Mixed quote styles (`'` / `"`) and missing semicolons; a Prettier config would normalize this.
- The `// set up use effect for pokeCards -> if starter selected...??` comment in `App.jsx:18` can go once starters are moved (see #5).

## What's already good

- Immutable state updates and stable `key={card.id}` (not array index).
- `useEffect` with an empty deps array for one-time load.
- Controlled-ish form handled via `FormData` + `preventDefault`; label/`htmlFor` pairing is correct.
- Duplicate and max-team checks exist (logic is right, just placed in the wrong spot, see #1).
- `main.jsx` is standard and correctly uses `StrictMode`; keep it, since it is what surfaces #1 and #2.

## Suggested fix order
1. Pure `addCard` (#1) + capitalize without mutating
2. Fix/guard the starter effect (#2)
3. Delete or finish `Types.jsx` (#3)
4. Replace `alert` with inline error + 404 message (#7)
5. Timer cleanup (#4), remove stray button/heading state, a11y tweaks
6. Optional: lift fetching to `App`/hook (#5), trim stored data (#6)

(Review only; no source files were changed. Cypress tests under `cypress/e2e/` were not part of this review, but #1, #2, and the card `id` naming may affect them.)
