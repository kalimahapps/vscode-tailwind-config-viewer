<h1 align="center">Tailwind Config Viewer</h1>
<p align="center">
<a target="_blank" href="https://www.npmjs.com/package/@kalimahapps/eslint-config">
  <img src="https://img.shields.io/badge/ESLint%20Config-kalimahapps-blue?style=flat-square">
</a>
<a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=KalimahApps.tailwind-config-viewer">
  <img src="https://img.shields.io/visual-studio-marketplace/v/KalimahApps.tailwind-config-viewer?style=flat-square"></a>
  <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=KalimahApps.tailwind-config-viewer">
  <img src="https://img.shields.io/visual-studio-marketplace/azure-devops/installs/total/KalimahApps.tailwind-config-viewer?style=flat-square"></a>
<a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=KalimahApps.tailwind-config-viewer">
  <img src="https://img.shields.io/visual-studio-marketplace/d/KalimahApps.tailwind-config-viewer?style=flat-square"></a>
</p>
<p align="center">
<a target=_blank href="https://twitter.com/KalimahApps">
  <img src="https://img.shields.io/twitter/follow/KalimahApps?style=for-the-badge">
</a>
</p>
<br>
View the config of your Tailwind CSS project in a sidebar. It will show you all the colors, fonts, spacing, etc. that you have defined in your config file as per tailwind.config.js file.

<br>
<br>

# Config file order
The extension will first priorties `tailwind.config.ts` then `tailwind.config.js` then `tailwind.config.cjs`

<br>
<br>

# Screenshots

![Accent colors](https://github.com/kalimahapps/vscode-tailwind-config-viewer/raw/HEAD/screenshots/accent-colors.png)

<br>

# Config
`workspacePath`: Use if the config file is not in the root of the project. For example, if you have a monorepo and the config file is in the root of the workspace. Default is current workspace root.
You can add either an absolute path (e.g. `C:/Users/username/project/tailwind.config.js`) or a relative path (e.g. `./tailwind.config.js`).

<br>

# Changelog
0.0.8
- Add support for `tailwind.config.ts` file.

0.0.6
- `workspacePath` config option now supports relative paths.

0.0.5
- Added `workspacePath` config option.
- Bug fix. Using `require` inside config file was causing an error if `{type: module}` is enabled.

0.0.4
- Added ESM support for tailwind.config.js

# Development
> Only use npm as a package manager as vsce commands will not work when other package managers are used.

1. Clone the repo
2. run `npm install`
3. run `cd client && npm install`
4. Restart VS Code if you have it open

When you open the project in VS Code, tasks will run automatically to build src and client folder. You can also run manually using the scripts in package.json for both folders.