import { useParams } from 'react-router-dom';

export default function EventDetailPage() {

  const params = useParams();

  return (
    <>
      <h2>EVENT DETAIL PAGE</h2>
      <p>{params.id}</p>
    </>
  )
}