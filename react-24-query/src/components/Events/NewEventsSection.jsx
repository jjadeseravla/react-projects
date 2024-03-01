import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function NewEventsSection() {
  const {data, isPending, isError, error } = useQuery({
    // queryKey cashes data so data can be shown quicker to the 
    // user as doesnt need to be fetched all the time
    queryKey: ['events'],
    queryFn: fetchEvents,
    // 20 miliS of waiting before sending new req for new data
    // to make sure no unneessary req made, the default is 0
    staleTime: 0,
    // gc is amount of time to keep cashed data before discarding it
    // gcTime: 1000
  })

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
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
