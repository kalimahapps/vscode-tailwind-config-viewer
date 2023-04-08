import type {
	WebviewViewProvider,
	Webview,
	WebviewView,
	CancellationToken,
	WebviewViewResolveContext
} from 'vscode';
import { Uri, window, SnippetString } from 'vscode';
import { TailwindConfig } from './tailwind-config';

class SidebarProvider implements WebviewViewProvider {
	public static readonly viewType = 'KalimahApps.tailwindcss-config-viewer';
	private webView?: WebviewView;

	constructor(
		private readonly extensionUri: Uri,
		private workspaceRoot: string
	) {
		this.workspaceRoot = workspaceRoot;
	}

	sendMessage(command: string, payload: string | object) {
		this.webView.webview.postMessage({
			command,
			payload,
		});
	}

	/**
	 * Update the webview content
	 */
	private async updateConfigData() {
		try {
			const tailwindConfigInstance = new TailwindConfig(this.workspaceRoot);
			const tailwindResolvedConfig = await tailwindConfigInstance.getConfig();

			this.sendMessage('init', tailwindResolvedConfig);
		} catch (error) {
			const { name, message } = error;
			window.showErrorMessage(message);
			if (name === 'FileNotFoundException') {
				this.sendMessage('error', message);
			}
			console.error(' --- ERROR----', error);
		}
	}

	/**
	 * Resolve the webview view and add the html
	 *
	 * @param {WebviewView}               webviewView The webview view instance
	 * @param {WebviewViewResolveContext} context     The webview view context
	 * @param {CancellationToken}         token       The cancellation token
	 */
	public resolveWebviewView(
		webviewView: WebviewView,
		context: WebviewViewResolveContext,
		token: CancellationToken
	) {
		this.webView = webviewView;

		// Display a message when the webview is first loaded
		this.updateConfigData();

		// Update the content based on view changes
		webviewView.onDidChangeVisibility(() => {
			if (webviewView.visible === true) {
				this.updateConfigData();
			}
		});

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,
			localResourceRoots: [this.extensionUri],
		};

		// Add html
		webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

		// Handle messages from the webview
		webviewView.webview.onDidReceiveMessage((data) => {
			const { command, text } = data;

			switch (command) {
				case 'refresh': {
					window.showErrorMessage('UPDATED');
					this.updateConfigData();
					break;
				}

				default: {
					break;
				}
			}
		});
	}

	/**
	 * Generate webview html
	 *
	 * @param  {Webview} webview The webview instance
	 * @return {string}          The html
	 */
	private getHtmlForWebview(webview: Webview): string {
		const vueFile = webview.asWebviewUri(Uri.joinPath(this.extensionUri, 'client-build', 'assets', 'main.js'));
		const stylesPathMainPath = webview.asWebviewUri(Uri.joinPath(this.extensionUri, 'client-build', 'assets', 'style.css'));

		// Use a nonce to only allow a specific script to be run.
		const nonce = this.getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
 				<link rel="stylesheet" href="${stylesPathMainPath}" />
				<title>Cat Colors</title>
			</head>
			<body>
				<div id="app"></div>

				<script type="module" nonce="${nonce}" src="${vueFile}"></script>
			</body>
			</html>`;
	}

	/**
	 * Get a random nonce
	 *
	 * @return {string} Nonce
	 */
	getNonce(): string {
		let text = '';
		const possible =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let index = 0; index < 32; index++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
}

export { SidebarProvider };