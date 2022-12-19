<script>
	/**
	 * @type {string | undefined}
	 */
	export let className = undefined;

	/**
	 * @type {number | undefined}
	 */
	export let colspan = undefined;
</script>

<td
	{colspan}
	class="border {className}  border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400"
	><slot /></td
>
