# Bootstrap Tabs

Extends an input text field to store multiple values. This library works by duplicating the input element you provide it in order to keep your existing form elements intact. Values are then written back to your original input as a comma separated (customisable) string.

## Installation
It is assumed Bootstrap (tested with `^5.3.3`) is already installed in your project.
```bash
npm i bootstrap-tabs
```

## API
Create an instance:
```js
import { BootstrapTabs } from "bootstrap-tabs";

let tabs = new BootstrapTabs(document.getElementById("input-field"));
```

### Settings
You can also provide a settings object as the second parameter to provide customisation. All settings are optional.

| Setting | Type | Default | Notes |
| ------- | ---- | ------- | ----- |
| `valueSeparator` | `string` | `','` | Provide a custom value separator when written back to the original input's value attribute
| `sortItems` | `boolean` | `false` | Enables or disables the default sort (Calls the built in array sort() function) |
| `sort` | `(a: string, b: string) => number;` | `null` | Provide a custom sort callback to order the tabs how you wish |
| `beforeAdd` | `(text: string) => boolean;` | `null` | Provide a callback function which returns a `boolean` to validate the newly created tab. This can be used to discard tabs before they're created |
| `disableDelete` | `boolean` | `false` | Set this to true to hide the delete button within each tab |
| `tabContentRenderer` | `(text: string, index: number) => string;` | `<span>${text}</span>` | Provide a function that returns an HTML string containing the contents of the tab to render. |
| `deleteContentRenderer` | `(text: string, index: number) => string;` | `<i class="bi bi-x-circle"></i>` | Provide a function that returns an HTML string containing the contents of the delete button within each tab to render. By default this uses the bootstrap-icons library `bi-x-circle` icon, so this function can be used to override this behaviour |
| `tabClassList` | `Array<string>` | `["badge", "bg-light", "text-dark"]` | The list of additional classes to be added to the tab. You can provide these as a way to fully customise how the tabs look. (Note: If you specify this array, the default classes will not be added) |
| `deleteBtnClassList` | `Array<string>` | `["badge", "bg-light", "text-dark"]` | The list of additional classes to be added to the tab. You can provide these as a way to fully customise how the tabs look. (Note: If you specify this array, the default classes will not be added) |

## CSS/SCSS
Both compiled CSS and the source SCSS is included in this package. You can from whichever works best for your project.

To import the SCSS into your worflow, you can add the following to your sass file:
```scss
@import "bootstrap-tabs/dist/scss/bootstrap-tabs";
```

If you're using vite you may need to add an alias to your vite.config.js:
```js
export default defineConfig({
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            '~bootstrap-tabs': path.resolve(__dirname, 'node_modules/bootstrap-tabs'),
        }
    },
    ...
```
and then import using the alias:
```scss
@import "~bootstrap-tabs/dist/scss/bootstrap-tabs";
```

## Cleanup
You can cleanup an instance by calling:
```js
instance.dispose();
```
