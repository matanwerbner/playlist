import type { Meeting } from '$lib/types/meeting';

export type TMemberList = {
	going: Array<string>;
	notGoing: Array<string>;
};

export const getMemberNamesList = (currMeeting: Meeting) => {
	return Object.entries(currMeeting?.members ?? {}).reduce<TMemberList>(
		(curr, next) => {
			if (next[1].attending) {
				return {
					...curr,
					going: [...curr.going, next[1].user.name]
				};
			} else {
				return {
					...curr,
					notGoing: [...curr.notGoing, next[1].user.name]
				};
			}
		},
		{
			going: [],
			notGoing: []
		}
	);
};
