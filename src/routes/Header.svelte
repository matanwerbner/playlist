<script lang="ts">
	import { page } from '$app/stores';
	import IconButton from '@smui/icon-button';
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';
	import logo from '$lib/images/logo2-text-only.png';
	import faces from '$lib/images/faces.png';
	import Menu from '@smui/menu';
	import List, { Item, Text } from '@smui/list';
	let menu: Menu;
</script>

<TopAppBar variant="static" prominent={false} dense={true} color={'primary'}>
	<Row>
		<Section class="flex justify-between">
			<div>
				<IconButton on:click={() => menu.setOpen(true)} class="material-icons">menu</IconButton>
				<Menu bind:this={menu}>
					<List>
						<Item
							on:SMUI:action={() => {
								window.location.href = '/meet/create';
							}}
						>
							<Text>מפגש חדש</Text>
						</Item>
						<Item on:SMUI:action={() => {}}>
							<Text>צרו קשר</Text>
						</Item>
					</List>
				</Menu>
			</div>
			<img width="200px" src={logo} alt="logo" />
			<a href="/">
				<img width="40px" src={faces} alt="logo" />
			</a>
		</Section>
	</Row>
</TopAppBar>

<!-- <header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
		<ul>
			<li
				class={$page.url.pathname === '/meet/create' ? 'current' : ''}
				aria-current={$page.url.pathname === '/meet/create' ? 'page' : undefined}
			>
				<a href="/meet/create">צור פגישה</a>
			</li>
		</ul>

		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
	</nav>
</header> -->
<style>
	header {
		display: flex;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.current::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
