/** @type {import('./$types').LayoutServerLoad} */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const load = async ({ locals }: any) => {
	if (!locals.session.data.userID) {
		await locals.session.set({ userID: Math.random().toString(16).slice(2) });
	}
	return {
		session: locals.session.data // You can also use your old `getSession` function if you wish.
	};
};
