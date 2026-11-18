import { useParams } from 'react-router';

export default function PokemonDetailsPage() {
  const { id } = useParams()

  return (
    <>
        <h2>Pokemon #{id}</h2>
        <BackButton/>
    </>
  )
}