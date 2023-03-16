import type { ExtensionContext } from 'vscode';
import { window, workspace } from 'vscode';
import { SidebarProvider } from './sidebar-provider';

/**
 * Call when extension is activated
 *
 * @param {ExtensionContext} context Extension context
 */
const activate = function (context: ExtensionContext) {
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
};

export { activate };
