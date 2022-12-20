import { error, fail } from '@sveltejs/kit';
import { getMeeting, updateMeeting } from '../../../firebase';

type routeParams = { meetingID: string };

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: { params: routeParams }) {
	const meeting = await getMeeting(params.meetingID);
	if (meeting.exists()) {
		return meeting.data();
	}

	throw error(404, 'Not found');
}

/** @type {import('./$types').Actions} */
export const actions = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setAttending: async ({ request, params, locals }: any) => {
		const data = await request.formData();
		const meetingID = params.meetingID;
		const userID = locals.session.data.userID;
		const isAttending = data.get('isAttending') === 'true';
		const userName = data.get('userName');
		const meeting = await getMeeting(meetingID);
		if (meeting.exists()) {
			const members = meeting.data().members;
			await updateMeeting(meetingID, 'members', {
				...members,
				[userID]: {
					attending: isAttending,
					user: {
						id: userID,
						name: userName
					}
				}
			});
			return { success: true };
		} else {
			return fail(404);
		}
	}
};
