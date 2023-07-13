import type { ExtensionContext } from 'vscode';
import { window, workspace, env, Uri } from 'vscode';
import { SidebarProvider } from './sidebar-provider';

/**
 * Call when extension is activated
 *
 * @param {ExtensionContext} context Extension context
 */
const activate = async function (context: ExtensionContext) {
	const workspacePath = workspace.workspaceFolders[0].uri.fsPath;

	const provider = new SidebarProvider(
		context.extensionUri,
		workspacePath
	);

	context.subscriptions.push(
		window.registerWebviewViewProvider(
			SidebarProvider.viewType,
			provider
		)
	);

	const isMesasgeDisplayed = context.globalState.get('twitter-message-displayed');

	if (isMesasgeDisplayed === undefined) {
		const goToTwitter = 'Follow me on Twitter!';
		const selection = await window.showInformationMessage('🎉 Thanks for using Tailwind Config Viewer', goToTwitter);
		if (selection === goToTwitter) {
			const twitterUrl = 'https://twitter.com/kalimahapps';
			env.openExternal(Uri.parse(twitterUrl));
		}
		context.globalState.update('twitter-message-displayed', true);
	}
};

export { activate };
