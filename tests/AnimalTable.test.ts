import { render, waitFor, screen } from '@testing-library/react';   
import Home from '../app/page';
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";
import '@testing-library/jest-dom';

const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

//  Close server after all tests
afterAll(() => server.close())

describe('App', () => {

  it('renders table with a peice of content', async () => {
    render(Home());
    await waitFor(() => {
      const linkElement = screen.getByTestId("tableAnimal_1");
      expect(linkElement).toBeInTheDocument();
    });
  });
});
