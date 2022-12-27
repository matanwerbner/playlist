<script>
	import Header from './Header.svelte';
	import '../reset.css';
	import '../typography.scss';
	import '../app.css';
</script>

<div class="app text-xl ">
	<Header />

	<main><slot /></main>

	<footer>
		<p class="text-3xl font-bold ">www.playlist.co.il</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		direction: rtl;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		gap: 1.3rem;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
