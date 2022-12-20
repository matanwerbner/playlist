<script>
	/**
	 * @type {string}
	 */
	export let modalTitle;

	/**
	 * @type {string}
	 */
	export let id;
</script>

<div
	class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
	{id}
	tabindex="-1"
	aria-labelledby="exampleModalCenterTitle"
	aria-modal="true"
	role="dialog"
>
	<div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
		<div
			class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
		>
			<div
				class="modal-header p-2 flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
			>
				<h5
					class="text-xl font-medium leading-normal text-gray-800"
					id="exampleModalScrollableLabel"
				>
					{modalTitle}
				</h5>
			</div>
			<div class="modal-body relative p-4">
				<slot />
			</div>
		</div>
	</div>
</div>
