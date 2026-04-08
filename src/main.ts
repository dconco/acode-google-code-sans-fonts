import { PLUGIN_ID } from './configs/constants'
import googleSansCodeRegular from './fonts/GoogleSansCode-Regular.ttf'
import googleSansCodeItalic from './fonts/GoogleSansCode-Italic.ttf'
import googleSansCodeMediumItalic from './fonts/GoogleSansCode-MediumItalic.ttf'

const FONT_CONFIGS = [
	{
		name: 'Google Code Sans',
		url: googleSansCodeRegular,
		weight: 400,
		style: 'normal'
	},
	{
		name: 'Google Code Sans Italic',
		url: googleSansCodeItalic,
		weight: 400,
		style: 'italic'
	},
	{
		name: 'Google Code Sans Medium-Italic',
		url: googleSansCodeMediumItalic,
		weight: 500,
		style: 'italic'
	}
]

class MainPlugin {
	async init() {
		const fonts = acode.require('fonts')
		for (const { name, url, weight, style } of FONT_CONFIGS) {
			fonts.add(
				name,
				`@font-face {
            font-family: '${name}';
            src: url('${url}') format('truetype');
            font-weight: ${weight};
            font-style: ${style};
         }`
			)
		}
	}

	async destroy() {
		const fonts = acode.require('fonts')
		for (const { name } of FONT_CONFIGS) {
			fonts.remove(name)
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
