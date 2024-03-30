import NodeCache from 'node-cache';
import type { Meeting } from './types/meeting';
const myCache = new NodeCache();

export const setMeetingInCache = (meeting: Meeting) => {
  myCache.set<Meeting>(meeting.slug, meeting);
};

export const getMeetingFromCache = (slug: string) => {
  return myCache.get<Meeting>(slug);
};
