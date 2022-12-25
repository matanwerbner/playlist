<script>
	import Going from '$lib/icons/going.svelte';
	import collage from '$lib/images/collage.jpg';
	import Button, { Label, Icon } from '@smui/button';
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<Paper class="text-shadow-white">
	<Content>
		<div>
			ברוכים הבאים לפלייליסט, האפליקציה שתאפשר לכם ליצור, לשתף ולנהל פגישות משחק וכל סוגי המפגשים.
		</div>
		<div class="mt-5">
			לחצו על "יצירת מפגש", הוסיפו פרטים בסיסיים, ותוכלו לשתף בוואטספ, אינסטגרם, מייל או SMS.
		</div>
	</Content>
</Paper>
<Button href="/meet/create" touch variant="raised" class="button-shaped-round p-6 btn-success mt-5">
	<Label class="font-bold text-xl flex items-center justify-between ">
		<span class="text-shadow">
			+&nbsp;יצירת מפגש &nbsp;<Going />
		</span>
	</Label>
</Button>

<img class="mt-12" src={collage} alt="collage" />
