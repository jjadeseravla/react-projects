import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>

      <h2>HOME PAGE</h2>
      <p>
        Go to <Link to="/events">to see events</Link>
      </p>
    </div>
  )
}