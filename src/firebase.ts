import { getRandomString } from '$lib/consts';
import type { Meeting } from '$lib/types/meeting';
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCA65JBypoxMd9hKVaiaxo_3CjvqxOK89A',
	authDomain: 'playlist-c9c16.firebaseapp.com',
	projectId: 'playlist-c9c16',
	storageBucket: 'playlist-c9c16.appspot.com',
	messagingSenderId: '759863746333',
	appId: '1:759863746333:web:3cdcce7b3784b2b4e40bf4',
	measurementId: 'G-DBG6YJZ1QG'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const createMeeting = async (meetingParams: Meeting) => {
	const slug = getRandomString();
	await setDoc(doc(db, 'meetings', slug), {
		...meetingParams
	});
	return slug;
};

const getMeeting = async (slug: string) => await getDoc(doc(db, 'meetings', slug));

export { createMeeting, getMeeting };
