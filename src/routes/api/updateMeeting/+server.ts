import { getMeetingFromCache, setMeetingInCache } from '$lib/cache';
import { redirect } from '@sveltejs/kit';
import { createMeeting } from '../../../firebase';
import { formDataToMeeting } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = async ({ request, locals }: { request: Request; locals: App.Locals }) => {
  const data = await request.formData();
  const userID = locals.session.data.userID;
  const meeting = formDataToMeeting(data, userID);
  const updatedMeeting = {
    ...getMeetingFromCache(meeting.slug),
    ...meeting
  };
  meeting.dateUpdate = Date.now();
  setMeetingInCache(updatedMeeting);
  createMeeting(updatedMeeting);
  throw redirect(303, `/meet/${updatedMeeting.slug}`);
};
