<script>
	/**
	 * @type {undefined}
	 */
	export let className = undefined;
	/**
	 * @type {undefined}
	 */
	export let onClick = undefined;

	/**
	 * @type {undefined}
	 */
	export let value = undefined;

	/**
	 * @type {undefined}
	 */
	export let name = undefined;
</script>

<button
	{value}
	{name}
	on:click={onClick}
	class="{className} bg-green-500  text-white font-bold py-2 px-4 rounded"><slot /></button
>
