import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import {
  useQuery,
   useMutation
} from '@tanstack/react-query';
import {
  fetchEvent,
   deleteEvent
} from '../../util/http.js';
import { queryClient } from '@tanstack/react-query';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import Header from '../Header.jsx';

// fetchevent useParams for id, output title and link to img
// and all capslocks and make delete button work useMutation
export default function EventDetails() {

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['event', params.id],
    queryFn: ({signal}) => fetchEvent({signal, id: params.id})
  });

  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events']
      }),
      navigate('/events');
    }
  });

  function handleOnClick() {
    mutate({ id: params.id });
  }

  let content;

  console.log('------', data);

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'failed to fetch events'}
      />
    );
  }



  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US',{
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    content = (
      <>
      <header>
      <h1>{data.title}</h1>
      <nav>
        <button onClick={handleOnClick}>Delete</button>
        <Link to="edit">Edit</Link>
      </nav>
    </header>
      <div id="event-details-content">
      <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
      <div id="event-details-info">
        <div>
            <p id="event-details-location">{data.location}</p>
            <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate}</time>
        </div>
          <p id="event-details-description">{data.description}</p>
      </div>
    </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
