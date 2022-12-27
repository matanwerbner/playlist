<script>
	import { browser } from '$app/environment';
	import Button, { Label, Icon } from '@smui/button';
	import WhatsappIcon from '$lib/icons/whatsapp.svelte';
	import { isMobileOrTablet } from '$lib/utilities/device';

	export let url;
	export let title;
	const isMobile = browser && isMobileOrTablet();
	const lineBreak = '%0a';
	const baseUrl = isMobile ? 'whatsapp://send' : 'https://web.whatsapp.com/send';
	const intro = 'כנסו ללינק לאשר שאתם מגיעים';
	const text = `👉👉👉 ${lineBreak}${encodeURIComponent(
		url
	)}${lineBreak}${title}${lineBreak}${intro}${lineBreak} 👈👈👈`;

	const urlWithParameters = `${baseUrl}?text=${text}`;

	function handleClick() {
		const config = {
			height: 550,
			width: 400,
			location: 'no',
			toolbar: 'no',
			status: 'no',
			directories: 'no',
			menubar: 'no',
			scrollbars: 'yes',
			resizable: 'no',
			centerscreen: 'yes',
			chrome: 'yes'
		};
		return window.open(
			urlWithParameters,
			'',
			Object.keys(config)
				// @ts-ignore
				.map((key) => `${key}=${config[key]}`)
				.join(',')
		);
	}
</script>

<Button
	class="whatsappShareButton"
	style="background-color: #25d366; height: 60px; padding:0px 30px;  border-radius: 50px;"
	touch
	variant="raised"
	on:click={handleClick}
	><Label class="screen-reader-text flex text-2xl items-center justify-around w-full">
		<Icon style="font-size:25px; height: 26px;" class="material-icons">share</Icon>
		שיתוף בווטסאפ<WhatsappIcon colour="#fff" width={30} /></Label
	></Button
>
