<script>
	import Going from '$lib/icons/going.svelte';
	import collage from '$lib/images/collage.jpg';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div class="p-3 m-3">
	<h1>ברוכים הבאים לplaylist !</h1>
	<h2>האפליקציה שמארגנת לכם את המפגשים!</h2>
	<h3>
		רוצים לארגן מפגש עם החברים?<br />
		צרו פגישה ושתפו אותה בwhatsapp
		<br />
		ותוכלו לראות מי מגיע ומי לא
		<Going />
	</h3>
	<img class="mt-7" src={collage} alt="collage" />
</div>

<style lang="scss">
</style>
