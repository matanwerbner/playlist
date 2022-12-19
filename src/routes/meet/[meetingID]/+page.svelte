<script>
	import { Days } from '$lib/consts';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<p>
	<label for="meetingTitle"> כותרת: </label>
	{data.title}
</p>
<p>
	<label for="meetingDescription">מה עושים:</label>
	{data.description}
</p>

<p>
	<label for="meetingPlace"> איפה נפגשים: </label>
	{data.location}
</p>
<p class="meetingDateContainer">
	<label for="meetingDate">באיזה יום?</label>
	{Days.find((d) => d.id == data.day)?.name}
</p>
<p class="meetingTimeContainer">
	<label for="meetingTime">באיזו שעה?</label>
	{data.time}
</p>
