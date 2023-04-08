<template>
	<TreeView v-if="error === ''" :data="data" @refresh="refreshData" />

	<div v-else class="error">
		{{ error }}
	</div>
</template>

<script setup lang="ts">
import {
	provideVSCodeDesignSystem,
	vsCodeTextField,
	vsCodeButton
} from '@vscode/webview-ui-toolkit';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { vscode } from './vscode';
import TreeView from './TreeView.vue';
import type { TailwindClassData } from './types';

const data: Ref<TailwindClassData> = ref({});
const error: Ref<string> = ref('');

// In order to use the Webview UI Toolkit web components they
// must be registered with the browser (i.e. webview) using the
// syntax below.
provideVSCodeDesignSystem().register(vsCodeTextField(), vsCodeButton());

// Handle the message inside the webview
window.addEventListener('message', (event) => {
	const messageDetails = event.data;
	const { payload, command } = messageDetails;

	switch (command) {
		case 'init': {
			data.value = payload;
			break;
		}

		case 'error': {
			error.value = payload;
			break;
		}
		default: {
			break;
		}
	}
});

/**
 * Send a message to the extension to refresh the data
 */
const refreshData = function () {
	vscode.postMessage({
		command: 'refresh',
	});
};
</script>

<style lang="scss">
.error {
	padding: 1em;
	border-left: 4px solid var(--vscode-editorOverviewRuler-errorForeground);
	white-space: pre-wrap;
}
</style>