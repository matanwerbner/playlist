<script>
	import { browser } from '$app/environment';
	import Button, { Label, Icon } from '@smui/button';
	import WhatsappIcon from '$lib/icons/whatsapp.svelte';
	import { isMobileOrTablet } from '$lib/utilities/device';

	const WHATSAPP_GREEN = '#25D366';

	export let url;
	export let title;

	const baseUrl =
		browser && isMobileOrTablet()
			? 'https://api.whatsapp.com/send'
			: 'https://web.whatsapp.com/send';
	const parametersObject = {
		text: title ? title + ' ' + url : url
	};

	const params = Object.entries(parametersObject)
		.filter(([, value]) => value ?? false)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
		.join('&');

	const urlWithParameters = params === '' ? baseUrl : `${baseUrl}?${params}`;

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
