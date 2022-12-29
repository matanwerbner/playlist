<script lang="ts">
	import type { Meeting } from '$lib/types/meeting';
	import MeetingForm from '../../meetingForm.svelte';
	import type { LayoutData } from '../$types';
	export let data: LayoutData;

	$: meeting = data.meeting as Meeting;
</script>

<MeetingForm action="/api/updateMeeting" title="עריכת מפגש" {meeting} />
