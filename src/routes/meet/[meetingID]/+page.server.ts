import { setMeetingInCache } from '$lib/cache';
import type { Meeting } from '$lib/types/meeting';
import { fail } from '@sveltejs/kit';
import { getMeeting, updateMeeting } from '../../../firebase';

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
			let updatedMembers = null;
			if (userName == null) {
				// we update existing member attending
				updatedMembers = {
					...members,
					[userID]: {
						...members[userID],
						attending: isAttending
					}
				};
			} else {
				updatedMembers = {
					...members,
					[userID]: {
						attending: isAttending,
						user: {
							id: userID,
							name: userName
						}
					}
				};
			}

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
