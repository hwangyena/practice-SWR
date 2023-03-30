// src/mocks/handlers.js
import { rest } from 'msw';

let user = {
  name: 'Quokka',
  description:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque reiciendis dicta accusantium deserunt saepe enim, voluptatum quas aut. In iste voluptates rerum nulla vitae numquam quisquam odio natus maiores delectus?',
  active: true,
};

export const handlers = [
  rest.get('/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.put('/user', async (req, res, ctx) => {
    const request = JSON.parse(JSON.parse(await req.text()).body) as Profile;

    user = request;
    const { name, active, description } = request;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        name,
        active,
        description,
      })
    );
  }),
];
