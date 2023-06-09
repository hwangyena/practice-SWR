import { DefaultBodyType, PathParams, rest, RestRequest } from 'msw';
import { userData } from '../lib/data';
import { STATUS_CODE } from './status';

let user: Profile = {
  name: 'name',
  description: 'write down yourself.',
  active: true,
};

const getData = async (
  req: RestRequest<DefaultBodyType, PathParams<string>>
) => {
  return JSON.parse(JSON.parse(await req.text()).body);
};

export const handlers = [
  // User
  rest.get('/user', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.put('/user', async (req, res, ctx) => {
    const { name, active, description } = (await getData(req)) as Profile;

    user = { name, active, description };

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

  // Auth
  rest.get('/login', async (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    const password = req.url.searchParams.get('password');

    const findUser = userData.find((user) => user.id === id);

    if (!findUser) {
      return res(
        ctx.status(401),
        ctx.json({
          code: 'USER_NOT_FOUND',
          message: STATUS_CODE.USER_NOT_FOUND,
        })
      );
    }

    if (findUser.password !== password) {
      return res(
        ctx.status(401),
        ctx.json({
          code: 'PASSWORD_DISMATCH',
          message: STATUS_CODE.PASSWORD_DISMATCH,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        token: 'test_token',
        ...user,
      })
    );
  }),

  rest.get('/logout', (req, res, ctx) => {
    console.log('req', req.headers);

    return res(ctx.status(200));
  }),

  // Post
  rest.get('/posts', async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
