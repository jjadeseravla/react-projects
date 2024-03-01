import { Link, useNavigate } from 'react-router-dom';
// useQuery only to SEND data (can be POST but not great), 
// for a POST req use:
import { useMutation } from '@tanstack/react-query';
import { createNewEvent } from '../../util/http.js';
import { queryClient } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  // mutate allows you to send req only when you tell it, not straight away like in useQuery
  const {mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    // onSuccess stays on screen only when/until mutation has succeeded
    onSuccess: () => {
      // invalidates a query, cos data fetched is now stale and data should be refetched 
      // if component is showing on screen.  to do this it takes an queryKey as argument.
      // to invalidate all queries with this query key at beginning, eg even 'events-images' etc
      queryClient.invalidateQueries({queryKey: ['events']}),
      navigate('/events');
    }
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
    // here you could type navigate('/events) to take you away, but
    // it would always execute even if there was an error, so its best
    // to use onSuccess in useMutation
  }



  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
        )}
      </EventForm>
      {isError && <ErrorBlock title="failed to create event" message={error.info?.message || 'falied to post data'}/>}
    </Modal>
  );
}
