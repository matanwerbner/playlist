<script>
	import Going from '$lib/icons/going.svelte';
	import collage from '$lib/images/collage.jpg';
	import logo from '$lib/images/logo2.png';
	import Button, { Label, Icon } from '@smui/button';
	import IconButton from '@smui/icon-button';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div class="flex flex-col items-center gap-5 p-3 m-3 justify-items-center">
	<div class="text-shadow-white font-bold">
		<div>
			ברוכים הבאים לפלייליסט, אפליקציה שתאפשר לכם ליצור, לשתף ולנהל פגישות משחק וכל דבר אחר שתרצו!
		</div>
		<div class="mt-5">פשוט לחצו על "יצירת מפגש", הוסיפו פרטים בסיסיים, ושתפו למי שתרצו!</div>
	</div>
	<Button touch variant="raised" class="button-shaped-round p-6 btn-success mt-5">
		<Label class="font-bold text-xl flex items-center justify-between ">
			<span class="text-shadow">
				+&nbsp;יצירת מפגש &nbsp;<Going />
			</span>
		</Label>
	</Button>
	<img class="mt-12" src={collage} alt="collage" />
</div>

<style lang="scss">
</style>
