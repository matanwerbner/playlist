import { Days } from '$lib/consts';
import type { Meeting } from '$lib/types/meeting';

export const formDataToMeeting = (data: FormData, userID: string) => {
	return {
		title: data.get('title'),
		description: data.get('description'),
		location: data.get('location'),
		time: data.get('time'),
		day: Days.find((d) => d.name == data.get('selectedDay'))?.id ?? null,
		adminID: userID,
		slug: data.get('slug')
	} as Meeting;
};
