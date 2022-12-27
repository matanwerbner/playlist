/** @type {import('./$types').LayoutServerLoad} */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const load = async ({ locals }: any) => {
	return {
		session: locals.session.data // You can also use your old `getSession` function if you wish.
	};
};

export const trailingSlash = 'always';
