import eslintConfig from '@kalimahapps/eslint-config';
/* build
client-build
!.vscode */
export default [
	{
		ignores: ['build', 'client-build'],
	},
	...eslintConfig,
];