import { render, screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('greeting component', () => {
  test('renders hello world as a text', () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText('Hello world!', { exact: false });
    // screen.get throws error if element not found
    //.find.. throws a promise
    //.query.. functions dont throw anything
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('if button not clicked, says good to see you text', () => {
    render(<Greeting />);
    const notClicked = screen.getByText('It\'s good to see you!');
    expect(notClicked).toBeInTheDocument();
  });

  test('if button clicked, text should say changed', () => {
    render(<Greeting />);
    const buttonElement = screen.getByRole('button'); // or use getByText
    useEvent.click(buttonElement);
    const outputElement = screen.getByText('changed!');
    expect(outputElement).toBeInTheDocument();
  });

  test('make sure it\'s good to see you text is not visible when button pressed ', () => {
    render(<Greeting />);
    const buttonElement = screen.getByRole('button');
    useEvent.click(buttonElement);
    const outputElement = screen.queryByText('it\s good to see you'); // queryByText instead
    // as this returns null (nothing) if element not found
    expect(outputElement).toBeNull();
  })
})