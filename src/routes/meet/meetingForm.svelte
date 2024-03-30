<script lang="ts">
	import Paper, { Title, Content } from '@smui/paper';
	import { Days } from '$lib/consts';
	import { preferences } from '../../store';
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Going from '$lib/icons/going.svelte';
	import LinearProgress from '@smui/linear-progress';
	import Button, { Label } from '@smui/button';
	import type { Meeting } from '$lib/types/meeting';
	let adminName = $preferences.userName;
	let selectedDay = null;
	export let meeting: Meeting;
	export let title = '';
	export let action = '   ';
	let isLoading = false;
	const onSubmit = async () => {
		isLoading = true;
		preferences.update(() => ({ userName: adminName }));
	};
</script>

<Paper class="mb-12 relative">
	<Title>{title}</Title>
	<Content>
		<form method="POST" class="flex flex-col gap-3 mt-5" {action} on:submit={onSubmit}>
			<input type="hidden" name="slug" bind:value={meeting.slug} />
			<input type="hidden" name="title" bind:value={meeting.title} />
			<input type="hidden" name="time" bind:value={meeting.time} />
			<input type="hidden" name="selectedDay" bind:value={selectedDay} />
			<input type="hidden" name="description" bind:value={meeting.description} />
			<input type="hidden" name="location" bind:value={meeting.location} />
			<input type="hidden" name="adminName" bind:value={adminName} />
			<div>
				<Textfield
					required
					name="title"
					style="width: 100%;"
					variant="outlined"
					class="shaped-outlined"
					bind:value={meeting.title}
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
					bind:value={meeting.description}
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
					bind:value={meeting.location}
					label="איפה נפגשים"
				>
					<HelperText slot="helper">לדוגמא: בית ספר נווה נאמן</HelperText>
				</Textfield>
			</div>

			<div>
				<Textfield
					name="adminName"
					required
					style="width: 100%;"
					variant="outlined"
					class="shaped-outlined"
					bind:value={adminName}
					label="שם המארגנ\ת"
				/>
			</div>
			<div class="mt-3">
				<Select label="יום" name="selectedDay" variant="outlined" bind:value={selectedDay}>
					{#each Days.map((d) => d.name) as day}
						<Option value={day}>
							{day}
						</Option>
					{/each}
				</Select>
				<Textfield
					variant="outlined"
					name="time"
					bind:value={meeting.time}
					label="שעה"
					type="time"
				/>
			</div>
			<Button touch variant="raised" class="button-shaped-round p-6 btn-success mt-5">
				<Label class="font-bold text-xl flex items-center justify-between ">
					<span class="text-shadow">סיימתי</span>&nbsp;<Going />
				</Label>
			</Button>
		</form>
		{#if isLoading}
			<div class="loadingContainer">
				<LinearProgress color="secondary" indeterminate />
			</div>
		{/if}
	</Content>
</Paper>
