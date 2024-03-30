<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { Days } from '$lib/consts';
	import Fab from '@smui/fab';
	import LinearProgress from '@smui/linear-progress';
	import { Icon } from '@smui/common';
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import Going from '$lib/icons/going.svelte';
	import NotGoing from '$lib/icons/notGoing.svelte';
	import AttendingDialog from './attendingDialog.svelte';
	import WhatsappShareButton from './whatsappShareButton.svelte';
	import { getMemberNamesList } from './utils';
	export let data: LayoutData;
	let isLoading = false;
	let currMeeting = data.meeting;
	$: session = $page.data.session;
	$: currUserID = session.userID;
	$: members = getMemberNamesList(currMeeting);
	$: hasSetAttendance = currMeeting?.members[currUserID] || currMeeting.adminID == currUserID;
	const dayName = Days.find((d) => d.id == currMeeting.day)?.name;
</script>

<svelte:head>
	<title>{currMeeting.title} - Playlist.co.il</title>

	<meta property="og:title" content="{currMeeting.title} - Playlist.co.il" />
	<meta
		property="og:description"
		content="האפליקציה שנותנת לכם ליצור מפגשים ולשתף אותם, כך שתמיד תדעו מי מגיע ומי לא"
	/>
</svelte:head>

{#if !hasSetAttendance}
	<AttendingDialog />
{/if}

<Paper>
	<Title><h4>{currMeeting.title}</h4></Title>
	<Subtitle><h5>{currMeeting.description}</h5></Subtitle>
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
<Paper class="relative">
	<Content class="flex justify-between">
		{#if members.going.length > 0}
			<div>
				<h7>אישרו הגעה&nbsp;</h7>
				<ol style="list-style-type: decimal;">
					{#each members.going as member}
						<li class="m-5">
							<h7>{member}&nbsp; <Going /></h7>
						</li>
					{/each}
				</ol>
			</div>
		{/if}

		{#if members.notGoing.length > 0}
			<div>
				<h7>לא יגיעו&nbsp;</h7>
				<ol style="list-style-type: decimal;">
					{#each members.notGoing as member}
						<li class="m-5">
							<h7>{member}&nbsp; <NotGoing /></h7>
						</li>
					{/each}
				</ol>
			</div>
		{/if}
	</Content>
	{#if isLoading}
		<div class="loadingContainer">
			<LinearProgress indeterminate />
		</div>
	{/if}
</Paper>

<div class="flex flex-col gap-3">
	<WhatsappShareButton meeting={currMeeting} />
	<div class="flex gap-7">
		{#if hasSetAttendance}
			<form method="POST" class="w-1/2" on:submit={() => (isLoading = true)}>
				{#if currMeeting?.members[currUserID]?.attending}
					<Fab touch color="secondary" class="flex center w-full m-0" extended
						>ביטול הגעה &nbsp;&nbsp;<Icon class="material-icons">cancel</Icon></Fab
					>
					<input type="hidden" name="isAttending" value="false" />
				{:else}
					<Fab touch color="primary" class="flex center w-full m-0" extended
						>אישור הגעה &nbsp;&nbsp;<Icon class="material-icons">check</Icon></Fab
					>
					<input type="hidden" name="isAttending" value="true" />
				{/if}
			</form>
		{/if}
		{#if currUserID == currMeeting.adminID}
			<Fab color="primary" href="edit" extended class="w-1/2"
				>עריכת המפגש&nbsp;&nbsp;<Icon class="material-icons">edit</Icon></Fab
			>
		{/if}
	</div>
</div>

<style lang="scss">
	table.meetingDetailsTable {
		width: 100%;
	}
	table.meetingDetailsTable > tr > td {
		padding: 20px 0px;
		text-align: right;
		width: 100%;
		vertical-align: middle;
		font-size: 1.2rem;
	}
	table.meetingDetailsTable > tr > td:first-child {
		width: 50px;
		padding-left: 10px;
	}
</style>
