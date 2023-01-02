<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Button, { Label, Icon } from '@smui/button';
	import WhatsappIcon from '$lib/icons/whatsapp.svelte';
	import { isMobileOrTablet } from '$lib/utilities/device';
	import type { Meeting } from '$lib/types/meeting';
	import { Days } from '$lib/consts';

	export let meeting: Meeting;
	const url = $page.url.href;
	const isMobile = browser && isMobileOrTablet();
	const lineBreak = '%0a';
	const baseUrl = isMobile ? 'whatsapp://send' : 'https://web.whatsapp.com/send';
	const intro = 'כנסו ללינק לאשר שאתם מגיעים';
	let timeString = meeting.day ? `ביום ${Days.find((d) => d.id == meeting.day)?.name} ` : '';
	timeString += meeting.time ? `${meeting.time ? 'בשעה' + meeting.time : ''}${lineBreak}` : '';
	const locationString = `ב${meeting.location}${lineBreak}`;
	const text = `👈👈👈 ${lineBreak}${encodeURIComponent(url)}${lineBreak}${
		meeting.title
	}${lineBreak}${timeString}${locationString}${intro}${lineBreak} 👉👉👉 `;

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
