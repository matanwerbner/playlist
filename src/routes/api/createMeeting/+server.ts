import { setMeetingInCache } from '$lib/cache';
import { redirect } from '@sveltejs/kit';
import { createMeeting } from '../../../firebase';
import { formDataToMeeting } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = async ({ request, locals }: { request: Request; locals: App.Locals }) => {
  const data = await request.formData();
  const userID = locals.session.data.userID;
  const meeting = formDataToMeeting(data, userID);
  meeting.members = {
    [userID]: {
      attending: true,
      user: {
        id: userID,
        name: (data.get('adminName') as string) ?? ''
      }
    }
  };
  meeting.dateCreated = Date.now();
  setMeetingInCache(meeting);
  createMeeting(meeting);
  throw redirect(303, `/meet/${meeting.slug}`);
};
