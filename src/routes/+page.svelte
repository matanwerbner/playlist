<script>
	import Going from '$lib/icons/going.svelte';
	import collage from '$lib/images/collage_380x304.webp';
	import Button, { Label } from '@smui/button';
	import Paper, { Content } from '@smui/paper';
</script>

<svelte:head>
	<title>פלייליסט</title>
</svelte:head>
<Paper class="text-shadow-white">
	<Content>
		<h6>
			ברוכים הבאים <b>לפלייליסט</b>, האפליקציה שתאפשר לכם ליצור, לשתף ולנהל פגישות משחק וכל סוגי
			המפגשים.
		</h6>
		<h6 class="mt-5">
			לחצו על "יצירת מפגש", הוסיפו פרטים בסיסיים, ותוכלו לשתף עם מי שתרצו ולבדוק מי מגיע ומי לא.
		</h6>
	</Content>
</Paper>
<Button href="/meet/create" touch variant="raised" class="button-shaped-round p-8 btn-success ">
	<Label class="font-bold text-2xl flex items-center justify-between">
		<span class="text-shadow">
			+&nbsp;יצירת מפגש &nbsp;<Going />
		</span>
	</Label>
</Button>
<img style="margin-top: auto;" src={collage} alt="collage" />
