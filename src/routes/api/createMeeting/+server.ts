import { setMeetingInCache } from '$lib/cache';
import { Days } from '$lib/consts';
import type { Meeting } from '$lib/types/meeting';
import { redirect } from '@sveltejs/kit';
import { createMeeting } from '../../../firebase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = async ({ request, locals }: any) => {
	const data = await request.formData();
	const userID = locals.session.data.userID;
	const meeting: Meeting = {
		title: data.get('title'),
		description: data.get('description'),
		location: data.get('location'),
		time: data.get('time'),
		day: Days.find((d) => d.name == data.get('selectedDay'))?.id ?? null,
		adminID: locals.session.data.userID,
		members: {
			[userID]: {
				attending: true,
				user: {
					id: userID,
					name: data.get('adminName')
				}
			}
		},
		slug: data.get('slug'),
		dateCreated: Date.now()
	};
	setMeetingInCache(meeting);
	createMeeting(meeting);
	throw redirect(303, `/meet/${meeting.slug}`);
};
