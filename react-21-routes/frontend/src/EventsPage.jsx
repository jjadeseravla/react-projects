// import { Link } from 'react-router-dom';

// export default function EventsPage() {

//   const EVENTS = [
//     { id: 'e1', title: 'Event 1' },
//     { id: 'e2', title: 'Event 2' },
//     { id: 'e3', title: 'Event 3' },
//   ];

//   return (
//     <>
//       <h2>EVENTS PAGE</h2>
//       {/* <li><Link to="/events/event-1">event 1</Link></li>
//       <li><Link to="/events/event-2">event 2</Link></li>
//       <li><Link to="/events/event-3">event 3</Link></li> */}
//       <ul>
//         {EVENTS.map((anEvent) => (
//           <li key={anEvent.id}>
//             <Link to={`/events/${anEvent.id}`}>
//             {anEvent.title}
//             </Link>
//           </li>))}
//       </ul>
//     </>
//   )
// }

import EventsList from './components/EventsList';

import { useLoaderData } from 'react-router-dom';
function EventsPage() {
  const events = useLoaderData();
  return (
    <>
      {<EventsList events={events} />}
    </>
  );
}

export default EventsPage;