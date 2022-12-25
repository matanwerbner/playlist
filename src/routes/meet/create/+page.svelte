<script lang="ts">
	import { goto } from '$app/navigation';
	import { Days, getRandomString } from '$lib/consts';
	import Button, { Label } from '@smui/button';
	import { page } from '$app/stores';
	import { preferences } from '../../../store';
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	let userName = $preferences.userName;
	let title = '';
	let description = '';
	let location = '';

	let selectedDay: string | null = null;
	let adminName = userName;
	let time = '';
	let slug = getRandomString();

	const onSubmit = async (e: { preventDefault: () => void }) => {
		preferences.update((p) => ({ userName }));
	};
</script>

<svelte:head>
	<title>יצירת מפגש חדש - playlist.co.il</title>
	<meta name="description" content="About this app" />
</svelte:head>

<Paper>
	<Title>יצירת מפגש חדש</Title>
	<Subtitle>לאחר הפרטים הראשוניים תועברו לדף המפגש</Subtitle>
	<Content>
		<form
			method="POST"
			class="flex flex-col gap-3"
			action="/api/createMeeting"
			on:submit={onSubmit}
		>
			<input type="hidden" name="slug" bind:value={slug} />
			<input type="hidden" name="title" bind:value={title} />
			<input type="hidden" name="time" bind:value={time} />
			<input type="hidden" name="selectedDay" bind:value={selectedDay} />
			<input type="hidden" name="description" bind:value={description} />
			<input type="hidden" name="location" bind:value={location} />
			<input type="hidden" name="adminName" bind:value={adminName} />
			<div>
				<Textfield
					required
					name="title"
					style="width: 100%;"
					variant="outlined"
					class="shaped-outlined"
					bind:value={title}
					label="כותרת המפגש"
				>
					<HelperText slot="helper">לדוגמא: משחקים כדורגל במגרש</HelperText>
				</Textfield>
			</div>
			<div>
				<Textfield
					required
					name="description"
					style="width: 100%;"
					helperLine$style="width: 100%;"
					textarea
					bind:value={description}
					label="מה עושים"
				>
					<HelperText slot="helper">לדוגמא: משחקים כדורגל 5 על 5</HelperText>
				</Textfield>
			</div>
			<div>
				<Textfield
					required
					style="width: 100%;"
					variant="outlined"
					class="shaped-outlined"
					name="location"
					bind:value={location}
					label="איפה נפגשים"
				>
					<HelperText slot="helper">לדוגמא: בית ספר נווה נאמן</HelperText>
				</Textfield>
			</div>
			<div>
				<Select label="יום" name="selectedDay" variant="outlined" bind:value={selectedDay}>
					{#each Days.map((d) => d.name) as day}
						<Option value={day}>
							{day}
						</Option>
					{/each}
				</Select>
				<Textfield variant="outlined" name="time" bind:value={time} label="שעה" type="time" />
			</div>
			<div>
				<Textfield
					name="adminName"
					style="width: 100%;"
					variant="outlined"
					class="shaped-outlined"
					bind:value={adminName}
					label="מארגנ\ת "
				/>
			</div>
			<Button touch variant="raised" class="button-shaped-round p-6 btn-success mt-5">
				<Label class="font-bold text-xl flex items-center justify-between ">
					<span class="text-shadow">צור פגישה </span>
				</Label>
			</Button>
		</form>
	</Content>
</Paper>

<style lang="scss">
	label {
		width: 100px;
	}
	p {
		display: flex;
		justify-content: space-between;
	}
	input,
	textarea {
		font-size: 20px;
		width: 200px;
		outline: 0;
		resize: none;
		border: 2px solid #483b3b6a;
		border-radius: 5px;
	}

	.meetingDateContainer,
	.meetingTimeContainer {
		display: flex;
		justify-content: flex-start;

		input,
		select {
			outline: 0;
			border: 2px solid #483b3b6a;
			width: 100px;
			padding: 5px;
		}
	}
</style>
