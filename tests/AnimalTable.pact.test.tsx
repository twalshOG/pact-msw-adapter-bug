import { render, waitFor, screen } from '@testing-library/react';   
import Home from '../app/page';
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";
import '@testing-library/jest-dom';
import { setupPactMswAdapter } from "@pactflow/pact-msw-adapter";

// Add the mock handlers to the MSW server
const server = setupServer(...handlers);

// Setup the Pact adapter
const pactMswAdapter = setupPactMswAdapter({
  server,
  options: {
    consumer: "frontend-msw", providers: { ['backend']: ['/v2/animals'] },
    debug: true,
    includeUrl: ['v2/animals', '/v2/animals'],
    // Exclude headers that are not relevant to the contract
    excludeHeaders: ["x-powered-by", "cookie", "ignore-me"],
    pactOutDir: "./pacts",
  },
});

server.events.on('request:start', ({ request, requestId }) => {
  console.log('Outgoing request:', request.method, request.url)
})

server.events.on('response:mocked', async ({ response }) => {
  const body = await response.text()
  console.log('Mocked:', response.status, response.url, body)
})

server.events.on('request:start', (req) => {
  console.log('request:start');
});

server.events.on('request:match', (req) => {
  console.log('request:match');
});

server.events.on('response:mocked', ({ request, requestId, response }) => {
  console.log(
    '%s %s received %s %s',
    request.method,
    request.url,
    response.status,
    response.statusText
  )
})

server.events.on('request:end', (req) => {
  console.log('request:end');
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

beforeEach(() => {
  pactMswAdapter.newTest();
});

afterEach(() => {
  //pactMswAdapter.verifyTest();
  server.resetHandlers();
});

afterAll(async () => {
  //await pactMswAdapter.writeToFile(); // writes the pacts to a file
  pactMswAdapter.clear();
  server.close();
});

test('renders table with a peice of content and capture pact', async() => {
  render(Home());
  await waitFor(() => {
    const tableRowElement = screen.getByTestId("tableAnimal_1");
    expect(tableRowElement).toBeInTheDocument();
  });
});