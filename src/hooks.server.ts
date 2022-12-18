import { sequence } from '@sveltejs/kit/hooks';
import { handleSession } from 'svelte-kit-cookie-session';

const sessionHandler = handleSession({
	expires: 2000,
	secret: '6TRsqJX996zjTn2LJ4Am1vhUoz60EkRk',
	cookie: {
		path: '/'
	}
});

export const handle = sequence(sessionHandler, ({ resolve, event }) => {
	return resolve(event);
});
