import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import "regenerator-runtime/runtime.js";
import 'whatwg-fetch';

import MessageInput from '../client/component/MessageInput';

// set up test server. api calls to /api/messages should return nothing but a 200 status
const server = setupServer(
  rest.post('/api/messages', (req, res, ctx) => {
    return res(ctx.json({}))
  }),
  rest.get('api/messages', (req, res, ctx) => {
    return res(ctx.json( 
      [
        {
          content: 'test message',
          time_stamp: '2021-12-07T18:44:46.000Z',
          id: 6,
          permission: true,
          edit: null,
          username: 'test user'
        }
      ]
    ))
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('the text input is cleared after message is sent', async () =>{
    render(<MessageInput />)
    fireEvent.click(screen.getByText('Send'))
    await waitFor(() => screen.getByRole('textbox'))
    expect(screen.getByRole('textbox')).toHaveTextContent('')
})