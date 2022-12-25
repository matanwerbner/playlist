<script lang="ts">
	import { page } from '$app/stores';
	import { Days } from '$lib/consts';
	import { applyAction, enhance } from '$app/forms';
	import Button, { Label } from '@smui/button';
	import MeetingTableCell from '../meetingTableCell.svelte';
	import MeetingTable from '../meetingTable.svelte';
	import Going from '$lib/icons/going.svelte';
	import NotGoing from '$lib/icons/notGoing.svelte';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Textfield from '@smui/textfield';
	import { preferences } from '../../../store';
	import type { Meeting } from '$lib/types/meeting';
	import { goto, invalidateAll } from '$app/navigation';
	export let data: { meeting: Meeting; session: any };
	let currMeeting = data.meeting;
	let isDialogOpen = false;
	$: session = $page.data.session;
	$: currUserID = session.userID;
	$: members = Object.entries(currMeeting?.members ?? {}).sort(
		(a, b) => Number(b[1].attending) - Number(a[1].attending)
	);

	let userName = $preferences.userName;
	const dayName = Days.find((d) => d.id == currMeeting.day)?.name;
	export const onFormSubmitted = () => {
		preferences.update((p) => ({ userName }));
	};
</script>

<Dialog
	surface$style="width: calc(100vw - 32px);height: 250px;"
	bind:open={isDialogOpen}
	aria-labelledby="simple-title"
	aria-describedby="simple-content"
>
	<Title>אישור הגעה</Title>
	<Content>
		<form class="w-full flex gap-x-3 flex-col mb-5" on:submit={onFormSubmitted} method="POST">
			<input type="hidden" name="userName" bind:value={userName} />
			<Textfield
				required
				style="width: 100%; margin-top: 10px"
				variant="outlined"
				class="shaped-outlined"
				bind:value={userName}
				label="מה שמך?"
			/>
			<Actions>
				<Button
					touch
					variant="raised"
					class="button-shaped-round p-6 btn-success mt-5"
					disabled={!userName}
					name="isAttending"
					value="false"><NotGoing /><Label>לא</Label></Button
				><Button
					touch
					variant="raised"
					class="button-shaped-round p-6 btn-success mt-5"
					action="accept"
					disabled={!userName}
					name="isAttending"
					value="true"><Going /><Label>מגיע\ה</Label></Button
				>
			</Actions>
		</form>
	</Content>
</Dialog>
{#if !currMeeting?.members.hasOwnProperty(currUserID) && !(currMeeting.adminID == currUserID)}
	<p class="w-full flex gap-x-3">
		<button
			on:click={() => {
				isDialogOpen = true;
			}}
			name="isAttending"
			value="true"
			class="w-1/2 bg-green-500 btn"><Going />מגיע\ה</button
		>
		<button
			on:click={() => {
				isDialogOpen = true;
			}}
			name="isAttending"
			value="true"
			class="w-1/2 bg-gray-500 btn"><NotGoing />לא מגיע\ה</button
		>
	</p>
{:else}
	<p>
		{#if currMeeting?.members[currUserID].attending}
			<Going /> מגיע\ה
		{:else}
			<NotGoing /> לא מגיע\ה
		{/if}
	</p>
{/if}
<MeetingTable className="mt-5">
	<tr>
		<MeetingTableCell>כותרת:</MeetingTableCell>
		<MeetingTableCell className="meetingTableValue">{currMeeting.title}</MeetingTableCell>
	</tr>
	<tr>
		<MeetingTableCell>מה עושים:</MeetingTableCell>
		<MeetingTableCell>{currMeeting.description}</MeetingTableCell>
	</tr>
	<tr>
		<MeetingTableCell>איפה נפגשים:</MeetingTableCell>
		<MeetingTableCell>{currMeeting.location}</MeetingTableCell>
	</tr>
	<tr>
		<MeetingTableCell>באיזה יום?</MeetingTableCell>
		<MeetingTableCell>{dayName}</MeetingTableCell>
	</tr>
	<tr>
		<MeetingTableCell>שעה?</MeetingTableCell>
		<MeetingTableCell>{currMeeting.time}</MeetingTableCell>
	</tr>
	<tr>
		<MeetingTableCell colspan={2}>
			<table class="mb-5 w-full gap-x-3">
				{#each members as [key, value]}
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
{#if currUserID == currMeeting.adminID}
	<button class="w-full mt-5 bg-blue-500">עריכת המפגש</button>
{/if}
