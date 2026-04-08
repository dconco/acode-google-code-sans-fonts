import { PLUGIN_ID } from './configs/constants'

class MainPlugin {
	async init() {
		// starts your code here
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
