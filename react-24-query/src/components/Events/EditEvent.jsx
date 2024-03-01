import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({signal, id: params.id})
  })

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    // OPTIMISTIC UPDATING
    // update data cashed by react query.
    // eg if you edit a form and then exit, and see the form in the old UI, 
    /// you want it updated immediately.
    onMutate: async (data) => {
      const newEvent = data.event;
      await queryClient.cancelQueries({ queryKey: ['events', params.id] });
      // if it fails to update on backend too, we need to roll it back to what it was
      const previousEvent = queryClient.getQueryData(['events', params.id]);

      queryClient.setQueryData(['events', params.id], newEvent);
      return { previousEvent: previousEvent}
    },
    onError: (error, data, context) => {
      queryClient.setQueriesData(['event', params.id], context.previousEvent);
    },
    // still make sure you have latest data from backend
    //makes back and frontend up to date
    onSettled: () => {
      queryClient.invalidateQueries(['events', params.id]);
    }
  })

  function handleSubmit(formData) {
    mutate({
      id: params.id,
      event: formData
    });
    // got to page im coming from
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = <p className='center'>waiting for data...</p>
  }

  if (isError) {
    content = <>
      <ErrorBlock title="cannot fetch data" message={error.info?.message || 'some error occurred'} />
      <div className='form-actions'>
      <Link to="../" className='button'>ok</Link>
      </div>
    </>
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>

    )
  }
     return   <Modal onClose={handleClose}> {content}   </Modal>

  
}
