<script lang="ts">
	import { getRandomString } from '$lib/consts';
	import type { Meeting } from '$lib/types/meeting';
	import { page } from '$app/stores';
	import MeetingForm from '../meetingForm.svelte';
	$: userID = $page.data.session.userID;
	let newMeeting: Meeting = {
		title: '',
		description: '',
		location: '',
		day: null,
		time: '',
		slug: getRandomString(),
		adminID: userID,
		members: {}
	};
</script>

<svelte:head>
	<title>יצירת מפגש חדש - playlist.co.il</title>
	<meta name="description" content="About this app" />
</svelte:head>

<MeetingForm title="יצירת מפגש חדש" meeting={newMeeting} />
