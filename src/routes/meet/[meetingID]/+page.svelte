<script>
	import { page } from '$app/stores';
	import { Days } from '$lib/consts';
	import { enhance } from '$app/forms';
	import MeetingTableCell from '../meetingTableCell.svelte';
	import MeetingTable from '../meetingTable.svelte';
	import Going from '$lib/icons/going.svelte';
	import NotGoing from '$lib/icons/notGoing.svelte';
	import CustomButton from '../../customButton.svelte';
	$: session = $page.data.session;
	$: currUserID = session.userID;
	/** @type {import('./$types').PageData} */
	export let data;
	const dayName = Days.find((d) => d.id == data.day)?.name;
</script>

{#if !data?.members.hasOwnProperty(currUserID) && !(data.adminID == currUserID)}
	<form class="w-full flex gap-x-3" action="?/setAttending" method="POST" use:enhance>
		<CustomButton name="isAttending" value="true" className="w-1/2 bg-green-500"
			><Going />מגיע\ה</CustomButton
		>

		<CustomButton name="isAttending" value="false" className="w-1/2 bg-gray-600"
			><NotGoing />לא מגיע\ה</CustomButton
		>
	</form>
{:else}
	<p>
		{#if data?.members[currUserID].attending}
			<Going /> מגיע\ה
		{:else}
			<NotGoing /> לא מגיע\ה
		{/if}
	</p>
{/if}
<MeetingTable className="mt-5">
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
	<tr>
		<MeetingTableCell colspan={2}>
			<table class="mb-5 w-full gap-x-3">
				{#each Object.entries(data.members) as [key, value]}
					<tr>
						<td class="w-1/2">{value.user.name}</td>
						<td class="w-1/2"
							>{#if value.attending === true}
								<Going /> מגיע\ה
							{:else}
								<NotGoing /> לא מגיע\ה
							{/if}</td
						>
					</tr>
				{/each}
			</table>
		</MeetingTableCell>
	</tr>
</MeetingTable>
{#if currUserID == data.adminID}
	<CustomButton className="w-full mt-5 bg-blue-500">עריכת המפגש</CustomButton>
{/if}
