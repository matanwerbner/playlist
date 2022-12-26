<script lang="ts">
	import { page } from '$app/stores';
	import { Days } from '$lib/consts';
	import Fab from '@smui/fab';
	import { Icon, Label } from '@smui/common';
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import Going from '$lib/icons/going.svelte';
	import NotGoing from '$lib/icons/notGoing.svelte';
	import type { Meeting } from '$lib/types/meeting';
	import AttendingDialog from './attendingDialog.svelte';
	import WhatsappShareButton from './whatsappShareButton.svelte';
	import { getMemberNamesList } from './utils';
	import { enhance } from '$app/forms';
	export let data: { meeting: Meeting; session: any };

	let currMeeting = data.meeting;
	$: session = $page.data.session;
	$: currUserID = session.userID;
	$: members = getMemberNamesList(currMeeting);
	const hasSetAttendance =
		!currMeeting?.members.hasOwnProperty(currUserID) && !(currMeeting.adminID == currUserID);
	const dayName = Days.find((d) => d.id == currMeeting.day)?.name;
</script>

{#if !hasSetAttendance}
	<AttendingDialog />
{/if}
<WhatsappShareButton title={currMeeting.title} url={$page.url.href} />
<Paper>
	<Title><h2>{currMeeting.title}</h2></Title>
	<Subtitle><h3>{currMeeting.description}</h3></Subtitle>
	<Content>
		<table class="meetingDetailsTable">
			<tr>
				<td>איפה:</td>
				<td>{currMeeting.location}</td>
			</tr>
			{#if dayName}
				<tr>
					<td>יום:</td>
					<td>{dayName}</td>
				</tr>
			{/if}
			{#if currMeeting.time}
				<tr>
					<td>שעה:</td>
					<td>{currMeeting.time}</td>
				</tr>
			{/if}
		</table>
	</Content>
</Paper>
<Paper>
	<Content>
		{#if members.going.length > 0}
			<h5>אישרו הגעה&nbsp;<Going /></h5>
			<ol style="list-style-type: decimal;">
				{#each members.going as member}
					<li class="m-5">
						<h5>{member}</h5>
					</li>
				{/each}
			</ol>
		{/if}
		{#if members.notGoing.length > 0}
			<h5>לא יגיעו&nbsp;<NotGoing /></h5>
			<ol style="list-style-type: decimal;">
				{#each members.notGoing as member}
					<li class="m-5">
						<h5>{member}</h5>
					</li>
				{/each}
			</ol>
		{/if}
	</Content>
</Paper>
{#if currUserID == currMeeting.adminID}
	<Fab color="primary" extended class="w-full mt-5 "
		>עריכת המפגש&nbsp;&nbsp;<Icon class="material-icons">edit</Icon></Fab
	>
{/if}
{#if hasSetAttendance}
	<form method="POST">
		{#if currMeeting?.members[currUserID].attending}
			<Fab touch color="secondary" class="flex center w-full" extended
				>ביטול הגעה &nbsp;&nbsp;<Icon class="material-icons">cancel</Icon></Fab
			>
			<input type="hidden" name="isAttending" value="false" />
		{:else}
			<Fab touch color="primary" class="flex center w-full" extended
				>אישור הגעה &nbsp;&nbsp;<Icon class="material-icons">check</Icon></Fab
			>
			<input type="hidden" name="isAttending" value="true" />
		{/if}
	</form>
{/if}

<style lang="scss">
	table.meetingDetailsTable {
		width: 100%;
	}
	table.meetingDetailsTable > tr > td {
		padding: 20px 0px;
		text-align: right;
		width: 100%;
		vertical-align: middle;
		font-size: 2rem;
	}
	table.meetingDetailsTable > tr > td:first-child {
		width: 50px;
		padding-left: 10px;
	}
</style>
