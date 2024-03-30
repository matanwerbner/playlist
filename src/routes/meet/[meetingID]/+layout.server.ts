import { getMeetingFromCache } from '$lib/cache';
import { setMeetingInCache } from '$lib/cache';
import type { Meeting } from '$lib/types/meeting';
import { error } from '@sveltejs/kit';
import { getMeeting } from '../../../firebase';
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
    return { meeting: meeting.data() as Meeting };
  }

  throw error(404, 'Not found');
}
