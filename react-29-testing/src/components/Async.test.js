import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'first post' }]
    });
    //allows you to set a value for resolved mock function eg resolve to
    // an obj that has a json value
    render(<Async />);
    const listItemElements = await screen.findAllByRole('listitem');
    // find waits for http req to succeeed
    expect(listItemElements).not.toHaveLength(0);
  });
});


