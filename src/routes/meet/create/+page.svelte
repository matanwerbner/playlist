<script>
	import { goto } from '$app/navigation';
	import { Days } from '$lib/consts';
	import { page } from '$app/stores';
	import { createMeeting } from '../../../firebase';
	$: session = $page.data.session;

	let title = '';
	let description = '';
	let location = '';
	let selectedDay = Days[0];
	let time = '';
	const onSubmit = async (/** @type {{ preventDefault: () => void; }} */ e) => {
		e.preventDefault();
		try {
			const result = await createMeeting({
				title,
				description,
				location,
				time,
				day: selectedDay.id,
				adminID: session.userID,
				members: {}
			});
			goto(`/meet/${result}`, { replaceState: false });
		} catch (ex) {}
	};
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<form on:submit={onSubmit}>
		<p>
			<label for="meetingTitle"> כותרת: </label>

			<input bind:value={title} name="meetingTitle" id="meetingTitle" />
		</p>
		<p>
			<label for="meetingDescription">מה עושים:</label>
			<textarea
				bind:value={description}
				name="meetingDescription"
				id="meetingDescription"
				cols="30"
				rows="4"
			/>
		</p>

		<p>
			<label for="meetingPlace"> איפה נפגשים: </label>

			<input bind:value={location} name="meetingPlace" id="meetingPlace" />
		</p>
		<p class="meetingDateContainer">
			<label for="meetingDate">באיזה יום?</label>

			<select bind:value={selectedDay} id="meetingDate">
				{#each Days as day}
					<option value={day}>
						{day.name}
					</option>
				{/each}
			</select>
		</p>
		<p class="meetingTimeContainer">
			<label for="meetingTime">באיזו שעה?</label>

			<input bind:value={time} type="time" />
		</p>

		<button type="submit">צור פגישה</button>
	</form>
</div>

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
