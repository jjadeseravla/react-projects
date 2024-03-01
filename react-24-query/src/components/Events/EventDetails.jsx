import { useState } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import {
  useQuery,
   useMutation
} from '@tanstack/react-query';
import {
  fetchEvent,
   deleteEvent
} from '../../util/http.js';
import { queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import Header from '../Header.jsx';
import Modal from '../UI/Modal.jsx';

// fetchevent useParams for id, output title and link to img
// and all capslocks and make delete button work useMutation
export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['event', params.id],
    queryFn: ({signal}) => fetchEvent({signal, id: params.id})
  });

  const { mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeletion,
    error: deleteError
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        referchType: 'none',
      }),
      navigate('/events');
    }
  });

  function handleDelete() {
    mutate({ id: params.id });
  }

  function handleStartDelete() {
    setIsDeleting(true)
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  let content;

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
        <button onClick={handleStartDelete}>Delete</button>
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
      {isDeleting && (
      <Modal onClose={handleStopDelete}>
        <h2>Are you sure?</h2>
        <div className='form-actions'>
          {isPendingDeletion && (
            <p>deleting, please wait</p>
          )}
          {!isPendingDeletion && (
            <>
          <button onClick={handleStopDelete}
            className="button-text">
              Cancel
            </button>
          <button onClick={handleDelete}
            className='button'>
            Delete
          </button>
            </>
          )}
        </div>
        {isErrorDeletion && <ErrorBlock title="failed to delete event" message={deleteError.info?.message || 'failed to delete event'}/>}
      </Modal>
      )}
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
