<script>
	/**
	 * @type {undefined}
	 */
	export let className = undefined;
</script>

<table
	class="border-collapse {className} border-hidden rounded-xl w-full border border-slate-400 bg-slate-50 shadow-lg"
>
	<tbody>
		<slot />
	</tbody>
</table>
