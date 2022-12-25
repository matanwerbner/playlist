import { getMeetingFromCache, setMeetingInCache } from '$lib/cache';
import type { Meeting } from '$lib/types/meeting';
import { error, fail } from '@sveltejs/kit';
import { getMeeting, updateMeeting } from '../../../firebase';

type routeParams = { meetingID: string };

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: { params: routeParams }) {
	const cachedMeeting = getMeetingFromCache(params.meetingID);
	if (cachedMeeting) {
		return {
			meeting: cachedMeeting
		};
	}
	const meeting = await getMeeting(params.meetingID);
	if (meeting.exists()) {
		setMeetingInCache(meeting.data() as Meeting);
		return { meeting: meeting.data() };
	}

	throw error(404, 'Not found');
}

/** @type {import('./$types').Actions} */
export const actions = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default: async ({ request, params, locals }: any) => {
		const data = await request.formData();
		const meetingID = params.meetingID;
		const userID = locals.session.data.userID;
		const isAttending = data.get('isAttending') === 'true';
		const userName = data.get('userName');
		const meeting = await getMeeting(meetingID);
		if (meeting.exists()) {
			const data = meeting.data();
			const members = data.members;
			const updatedMembers = {
				...members,
				[userID]: {
					attending: isAttending,
					user: {
						id: userID,
						name: userName
					}
				}
			};
			updateMeeting(meetingID, {
				...(data as Meeting),
				members: updatedMembers
			});
			setMeetingInCache({
				...(data as Meeting),
				members: updatedMembers
			});
			return { success: true };
		} else {
			return fail(404);
		}
	}
};
