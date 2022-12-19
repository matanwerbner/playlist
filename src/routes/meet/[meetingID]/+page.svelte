<script>
	import { page } from '$app/stores';
	import { Days } from '$lib/consts';
	import MeetingTableCell from '../meetingTableCell.svelte';
	import MeetingTable from '../meetingTable.svelte';
	$: session = $page.data.session;

	/** @type {import('./$types').PageData} */
	export let data;
	const isAttending = () => data.members[session.userID] === true;
	const dayName = Days.find((d) => d.id == data.day)?.name;
</script>

{#if isAttending()}
	<button class="btn btn-blue">מגיע</button>
{:else}
	<button class="btn btn-blue">לא מגיע</button>
{/if}
<MeetingTable>
	<tr>
		<MeetingTableCell>כותרת:</MeetingTableCell>
		<MeetingTableCell className="meetingTableValue">{data.title}</MeetingTableCell>
	</tr>
	<tr>
		<MeetingTableCell>מה עושים:</MeetingTableCell>
		<MeetingTableCell>{data.description}</MeetingTableCell>
	</tr>
	<tr>
		<MeetingTableCell>איפה נפגשים:</MeetingTableCell>
		<MeetingTableCell>{data.location}</MeetingTableCell>
	</tr>
	<tr>
		<MeetingTableCell>באיזה יום?</MeetingTableCell>
		<MeetingTableCell>{dayName}</MeetingTableCell>
	</tr>
	<tr>
		<MeetingTableCell>באיזו שעה?</MeetingTableCell>
		<MeetingTableCell>{data.time}</MeetingTableCell>
	</tr>
</MeetingTable>
{session?.userID == data.adminID ? 'admin' : 'non-admin'}
