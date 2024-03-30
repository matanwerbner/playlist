<script>
  /**
   * @type {undefined}
   */
  export let name = undefined;
  /**
   * @type {undefined}
   */
  export let value = undefined;
  /**
   * @type {undefined}
   */
  export let id = undefined;
  /**
   * @type {string | undefined}
   */
  export let label = undefined;
  /**
   * @type {undefined}
   */
  export let classNames = undefined;
  /**
   * @type {undefined}
   */
  export let placeholder = undefined;
</script>

<div>
  {#if label != null}
    <label for={id} class="form-label inline-block mb-2 text-gray-700">{label}</label>
  {/if}
  <input
    type="text"
    class="
        {classNames}
  form-control
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
    {name}
    bind:value
    {id}
    {placeholder}
  />
</div>
