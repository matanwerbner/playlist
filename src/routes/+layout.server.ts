
/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ locals }) => {
	if(!locals.session.data.userID) {
        await locals.session.set({userID: Math.random().toString(16).slice(2)})
    }	
	return {
		session: locals.session.data // You can also use your old `getSession` function if you wish.
	};
};

/** @type {import('@sveltejs/kit').Actions} */
export const actions = {
	default: async ({ locals }) => {
		const { counter = 0 } = locals.session.data;

		await locals.session.set({ counter: counter + 1 });

		return {};
	}
};