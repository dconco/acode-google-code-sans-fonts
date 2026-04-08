import { PLUGIN_ID } from './configs/constants'

class MainPlugin {
	async init() {
		const fonts = acode.require('fonts')

		fonts.add(
			'Google Code Sans',
			`@font-face {
            font-family: 'Google Code Sans';
            src: url('/src/fonts/GoogleSansCode-Regular.ttf');
            font-weight: 400;
            font-style: normal;
         }`
		)

		fonts.add(
			'Google Code Sans Italic',
			`@font-face {
            font-family: 'Google Code Sans Italic';
            src: url('/src/fonts/GoogleSansCode-Italic.ttf');
            font-weight: 400;
            font-style: italic;
         }`
		)

		fonts.add(
			'Google Code Sans Medium-Italic',
			`@font-face {
            font-family: 'Google Code Sans Medium-Italic';
            src: url('/src/fonts/GoogleSansCode-MediumItalic.ttf');
            font-weight: 500;
            font-style: italic;
         }`
		)

	}

	async destroy() {
		// unregister your codes here
	}
}

if (window.acode) {
	const myPlugin = new MainPlugin()

	acode.setPluginInit(
		PLUGIN_ID,
		async (
			baseUrl: string,
			$page: HTMLElement,
			{
				cacheFile,
				cacheFileUrl
			}: { cacheFile: string; cacheFileUrl: string }
		) => {
			if (!baseUrl.endsWith('/')) {
				baseUrl += '/'
			}
			await myPlugin.init()
		}
	)

	acode.setPluginUnmount(PLUGIN_ID, () => {
		myPlugin.destroy()
	})
}
