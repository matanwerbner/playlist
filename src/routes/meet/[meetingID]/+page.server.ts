import { error } from '@sveltejs/kit';
import { getMeeting } from '../../../firebase';

type routeParams = { meetingID: string };

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: { params: routeParams }) {
	const meeting = await getMeeting(params.meetingID);
	if (meeting.exists()) {
		return meeting.data();
	}

	throw error(404, 'Not found');
}
