// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.put('/user', async (req, res, ctx) => {
    const { age, name } = JSON.parse(await req.text()) as {
      name: string;
      age: number;
    };

    return res(
      ctx.status(200),
      ctx.json({
        name,
        age,
        active: false,
      })
    );
  }),

  rest.get('/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'admin',
        age: 20,
        active: true,
      })
    );
  }),
];
