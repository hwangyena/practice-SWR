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
        name: 'Quokka',
        description:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque reiciendis dicta accusantium deserunt saepe enim, voluptatum quas aut. In iste voluptates rerum nulla vitae numquam quisquam odio natus maiores delectus?',
        active: true,
      })
    );
  }),
];
