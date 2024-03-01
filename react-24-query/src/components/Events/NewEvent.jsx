import { Link, useNavigate } from 'react-router-dom';
// useQuery only to SEND data, for a POST req use:
import { useMutation } from '@tanstack/react-query';
import { createNewEvent } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  // mutate allows you to send req only when you tell it, not straight away like in useQuery
  const {mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
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
