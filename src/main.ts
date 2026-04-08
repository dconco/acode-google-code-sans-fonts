import { PLUGIN_ID } from './configs/constants'
import googleSansCodeRegular from './fonts/GoogleSansCode-Regular.ttf'
import googleSansCodeItalic from './fonts/GoogleSansCode-Italic.ttf'
import googleSansCodeMediumItalic from './fonts/GoogleSansCode-MediumItalic.ttf'

class MainPlugin {
	private readonly fontNames = [
		'Google Code Sans',
		'Google Code Sans Italic',
		'Google Code Sans Medium-Italic'
	]

	async init() {
		const fonts = acode.require('fonts')

		fonts.add(
			'Google Code Sans',
			`@font-face {
            font-family: 'Google Code Sans';
            src: url('${googleSansCodeRegular}') format('truetype');
            font-weight: 400;
            font-style: normal;
         }`
		)

		fonts.add(
			'Google Code Sans Italic',
			`@font-face {
            font-family: 'Google Code Sans Italic';
            src: url('${googleSansCodeItalic}') format('truetype');
            font-weight: 400;
            font-style: italic;
         }`
		)

		fonts.add(
			'Google Code Sans Medium-Italic',
			`@font-face {
            font-family: 'Google Code Sans Medium-Italic';
            src: url('${googleSansCodeMediumItalic}') format('truetype');
            font-weight: 500;
            font-style: italic;
         }`
		)
	}

	async destroy() {
		const fonts = acode.require('fonts')
		for (const fontName of this.fontNames) {
			fonts.remove(fontName)
		}
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
