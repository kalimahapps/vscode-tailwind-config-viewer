<template>
	<div class="tree-view-wrapper">
		<div class="search-container">
			<vscode-text-field
				placeholder="Search ..."
				class="search-input"
				:value="searchKeywords"
				@keyup="startSearch"
			>
				<span slot="start">
					<IoOutlineSearch />
				</span>

				<span slot="end">
					<div
						v-if="searchKeywords.length > 0"
						class="clear-button"
						@click="searchKeywords = ''"
					>
						<MdTwoToneClear />
					</div>
				</span>
			</vscode-text-field>
		</div>

		<div class="container">
			<!-- Build tree view -->
			<div
				v-if="Object.keys(getSortedData).length > 0"
				class="tree-view"
			>
				<div v-for="(classes, key) in getSortedData" :key="key">
					<div
						class="tree-view-heading"
						:data-expanded="currentExpanded.includes(key)"
						@click="toggleExpanded(key)"
					>
						<BsChevronRight class="chevron" />

						<span>{{ key }}</span>
					</div>

					<div v-if="currentExpanded.includes(key)" class="tree-view-body">
						<div
							v-for="(classData, className) in classes"
							:key="className"
							class="tree-body-item"
						>
							<span v-html="formatClassName(className as string)" />

							<span
								v-if="shouldShowColorBox(className as string)"
								class="color-box"
								:style="getColorBoxStyle(key, classData as TailwindClassData)"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Display no results found message -->
			<div v-if="searchKeywords.length > 0 && Object.keys(getSortedData).length === 0">
				No results found
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { IoOutlineSearch, BsChevronRight, MdTwoToneClear } from '@kalimahapps/vue-icons';

import { ref, computed, toRef } from 'vue';
import type { Ref } from 'vue';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { TailwindClassData } from './types';

const props = defineProps({
	/**
	 * The data to be displayed in the tree view
	 */
	data: {
		type: Object as () => TailwindClassData,
		required: true,
	},
});

defineEmits(['refresh']);

const data = toRef(props, 'data');
const currentExpanded: Ref<string[]> = ref([]);
const searchKeywords = ref('');

/**
 * Retrieve the data based on the search keywords
 */
const getSearchData = computed(() => {
	const keywords = searchKeywords.value.toLowerCase();

	if (keywords.length === 0) {
		return data.value;
	}
	const filteredData: TailwindClassData = {};

	Object.keys(data.value).forEach((key) => {
		const classes: TailwindClassData = data.value[key] as TailwindClassData;

		const filteredClasses: TailwindClassData = {};

		if (key.toLowerCase().includes(keywords)) {
			filteredData[key] = classes;
			return;
		}

		Object.keys(classes).forEach((className) => {
			if (className.toLowerCase().includes(keywords)) {
				filteredClasses[className] = classes[className];
			}
		});

		if (Object.keys(filteredClasses).length > 0) {
			filteredData[key] = filteredClasses;
		}
	});

	return filteredData;
});

/**
 * Sort the searched data alphabetically
 */
const getSortedData = computed(() => {
	const sortedData: Record<string, TailwindClassData> = {};

	Object.keys(getSearchData.value)
		.sort()
		.forEach((key) => {
			sortedData[key] = getSearchData.value[key] as TailwindClassData;
		});

	return sortedData;
});

/**
 * Start the search
 *
 * @param {KeyboardEvent} event The keyboard event
 */
const startSearch = (event: KeyboardEvent) => {
	const target = (<HTMLInputElement>event.target);
	searchKeywords.value = target.value;
};

/**
 * Show the color box for utilities that have colors (bg, text, border, etc.)
 *
 * @param  {string}  className The class name
 * @return {boolean}           Whether or not to show the color box
 */
const shouldShowColorBox = (className: string): boolean => {
	const classesWithColors = [
		'bg',
		'text',
		'border',
		'ring',
		'from',
		'to',
		'divide',
		'placeholder',
		'via',
		'decoration',
		'outline',
		'accent',
		'shadow',
		'caret',
	];

	return classesWithColors.some((colorClass) => {
		return className.startsWith(`.${colorClass}-`);
	});
};

/**
 * Get the style for the color box
 *
 * @param  {string}            utilityName The utility name
 * @param  {TailwindClassData} classData   The class data
 * @return {object}                        The style object
 */
const getColorBoxStyle = (utilityName: string, classData: TailwindClassData) => {
	/**
	 * Each utility name has a different name for the color property
	 * This object maps the utility name to the color property name
	 */
	const lookForMap : Record<string, string> = {
		backgroundColor: 'color',
		textColor: 'color',
		borderColor: 'color',
		ringColor: 'color',
		ringOffsetColor: 'color',
		gradientColorStops: 'gradient',
		divideColor: 'color',
		placeholderColor: 'color',
		textDecorationColor: 'color',
		outlineColor: 'color',
		accentColor: 'color',
		boxShadowColor: 'color',
		caretColor: 'color',
	};

	const currentUtilityName = lookForMap[utilityName];
	const colorProp = Object.keys(classData).find((key) => {
		return key.includes(currentUtilityName);
	});

	const opacityProp = Object.keys(classData).find((key) => {
		return key.includes('opacity');
	});

	if (colorProp === undefined){
		console.warn('colorProp is undefined', utilityName, classData);
		return {};
	}

	const style : Record<string, string> = {
		backgroundColor: classData[colorProp] as string,
	};

	// If the opacity property exists, add it to the style object
	if (opacityProp !== undefined){
		style[opacityProp] = classData[opacityProp] as string;
	}

	return style;
};

/**
 * Format the class name to be displayed
 *
 * @param  {string} className The class name
 * @return {string}           The formatted class name
 */
const formatClassName = (className: string) : string => {
	return className
		.replace('\\/', '/')
		.replace('\\.', '.')
		.replace('> :not([hidden]) ~ :not([hidden])', '<span class="less-opacity">> :not([hidden]) ~ :not([hidden])</span>');
};

/**
 * Toggle the expanded state of a class name
 *
 * @param {string} className The class name
 */
const toggleExpanded = (className: string) => {
	const index = currentExpanded.value.indexOf(className);

	if (index === -1) {
		currentExpanded.value.push(className);
	} else {
		currentExpanded.value.splice(index, 1);
	}
};
</script>

<style lang="scss">
.tree-view-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;

	> div {
		margin-bottom: 1rem;
	}
}

.container{
	flex-grow: 1;
	overflow: auto;
	width: 100%;
}

.search-container{
	flex-shrink: 0;
	width: 100%;
	display: flex;
	align-items: center;

	.clear-button {
		cursor: pointer;
	}

	.refresh-button{
		padding: 0.2em 0.4em;
	}

	.search-input{
		flex-grow: 1;
		// margin-right: 1em;
	}
}

.tree-view {
	margin-bottom: 1em;
	width: 100%;
	height: 100%;

	.tree-view-heading {
		cursor: pointer;
		margin-top: 0.5em;
		display: flex;
		align-items: center;

		.chevron {
			margin-right: 0.5em;
		}

		&[data-expanded='true']{
			.chevron {
				transform: rotate(90deg);
			}
		}
	}

	.tree-view-body {
		padding-left: 1em;
		margin-left: 0.5em;
		border-left: 1px solid #cccccc1e;

		.tree-body-item{
			margin-top: 0.5em;
			display: flex;
			align-items: center;

			.less-opacity{
				opacity: 0.2;
			}
		}

		.color-box {
			display: block;
			height: 10px;
			width: 10px;
			border-radius: 2px;
			margin-left: 1em;
		}
	}
}
</style>