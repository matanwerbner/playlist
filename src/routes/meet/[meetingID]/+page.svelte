<script>
	import { page } from '$app/stores';
	import { Days } from '$lib/consts';
	import { enhance } from '$app/forms';
	import MeetingTableCell from '../meetingTableCell.svelte';
	import MeetingTable from '../meetingTable.svelte';
	import Going from '$lib/icons/going.svelte';
	import NotGoing from '$lib/icons/notGoing.svelte';
	import Modal from '../../modal.svelte';
	import CustomTextInput from '../../customTextInput.svelte';
	import { preferences } from '../../../store';
	/** @type {import('./$types').PageData} */
	export let data;

	$: session = $page.data.session;
	$: currUserID = session.userID;
	$: members = Object.entries(data?.members).sort((a, b) => b[1].attending - a[1].attending);

	let userName = $preferences.userName;
	const dayName = Days.find((d) => d.id == data.day)?.name;
	export const onFormSubmitted = () => {
		preferences.update((p) => ({ userName }));
	};
</script>

<Modal modalTitle="אישור הגעה" id="setAttendingModal">
	<form
		class="w-full flex gap-x-3 flex-col"
		on:submit={onFormSubmitted}
		action="?/setAttending"
		method="POST"
		use:enhance
	>
		<p>
			<CustomTextInput label="מה שמך?" name="userName" id="userNameInput" bind:value={userName} />
		</p>
		<p class="flex mt-10 gap-5">
			<button
				disabled={!userName}
				name="isAttending"
				data-bs-target="#setAttendingModal"
				data-bs-toggle="modal"
				value="true"
				class="w-1/2 btn bg-green-500"><Going />מגיע\ה</button
			>

			<button
				disabled={!userName}
				name="isAttending"
				data-bs-target="#setAttendingModal"
				data-bs-toggle="modal"
				value="false"
				class="w-1/2 btn bg-gray-500"><NotGoing />לא מגיע\ה</button
			>
		</p>
	</form>
</Modal>
{#if !data?.members.hasOwnProperty(currUserID) && !(data.adminID == currUserID)}
	<p class="w-full flex gap-x-3">
		<button
			data-bs-target="#setAttendingModal"
			data-bs-toggle="modal"
			name="isAttending"
			value="true"
			class="w-1/2 bg-green-500 btn"><Going />מגיע\ה</button
		>
		<button
			data-bs-target="#setAttendingModal"
			data-bs-toggle="modal"
			name="isAttending"
			value="true"
			class="w-1/2 bg-gray-500 btn"><NotGoing />לא מגיע\ה</button
		>
	</p>
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
		<MeetingTableCell>שעה?</MeetingTableCell>
		<MeetingTableCell>{data.time}</MeetingTableCell>
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
{#if currUserID == data.adminID}
	<button class="w-full mt-5 bg-blue-500">עריכת המפגש</button>
{/if}
