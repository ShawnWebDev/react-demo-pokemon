import { useParams } from 'react-router';
import BackButton from '../components/BackButton.jsx';

export default function PokemonDetailsPage() {
  const { id } = useParams()

  return (
    <>
        <h2>Pokemon #{id}</h2>
        <BackButton/>
    </>
  )
}