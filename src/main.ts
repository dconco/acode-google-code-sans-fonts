import { PLUGIN_ID } from './configs/constants'
import { FONT_CONFIGS } from './fonts'

class MainPlugin {
	async init() {
		const fonts = acode.require('fonts')

		for (const { name, url, weight, style } of FONT_CONFIGS) {
			fonts.add(
				name,
				`@font-face {\n  font-family: '${name}';\n  src: url('${url}') format('truetype');\n  font-weight: ${weight};\n  font-style: ${style};\n}`
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
