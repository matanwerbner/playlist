import { sequence } from '@sveltejs/kit/hooks';
import { handleSession } from 'svelte-kit-cookie-session';

const sessionHandler = handleSession({
  expires: 2000,
  secret: '6TRsqJX996zjTn2LJ4Am1vhUoz60EkRk',
  cookie: {
    path: '/'
  }
});

export const handle = sequence(sessionHandler, async ({ resolve, event }) => {
  if (!event.locals.session.data.userID) {
    await event.locals.session.set({ userID: Math.random().toString(16).slice(2) });
  }
  return resolve(event);
});
