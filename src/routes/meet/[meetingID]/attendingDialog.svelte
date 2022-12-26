<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Going from '$lib/icons/going.svelte';
	import NotGoing from '$lib/icons/notGoing.svelte';
	import { preferences } from '../../../store';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Textfield from '@smui/textfield';
	let isDialogOpen = false;
	let userName = $preferences.userName;

	const onFormSubmitted = () => {
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
<p class="w-full flex gap-x-3 m-0">
	<Button
		touch
		variant="raised"
		on:click={() => {
			isDialogOpen = true;
		}}
		class="button-shaped-round p-5 w-1/2"
	>
		<Label class="font-bold text-xl flex items-center justify-between ">
			<span class="text-shadow"><Going />&nbsp;מגיע\ה</span>
		</Label>
	</Button>
	<Button
		color="secondary"
		touch
		variant="raised"
		on:click={() => {
			isDialogOpen = true;
		}}
		class="button-shaped-round p-5 w-1/2"
	>
		<Label class="font-bold text-xl flex items-center justify-between ">
			<span class="text-shadow"><NotGoing />&nbsp;לא מגיע\ה</span>
		</Label>
	</Button>
</p>
