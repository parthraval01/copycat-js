````markdown
# CopyCat.js

**CopyCat.js** is a lightweight, secure, and user-friendly clipboard helper for the web. It supports modern browsers and offers fallbacks for older ones, with minimal footprint and no dependencies.

## Goals

- Minimal runtime size with no external dependencies.
- Utilize the modern `navigator.clipboard` API when available (secure contexts).
- Provide a robust fallback using `document.execCommand()` for older browsers.
- Optional toast notifications for user feedback.
- Easy to maintain and extend.

## Features

- **Cross-browser compatibility**: Works across modern and older browsers.
- **Simple API**: Easy-to-use clipboard interactions.
- **Feedback option**: Customizable toast feedback for user actions.
- **Lightweight**: Minimal dependencies and small file size.
- **Secure**: Uses the secure `navigator.clipboard` API when possible.

## Install

Install via npm:

```bash
npm install copycat-js
````

## Quick Usage

To get started with **CopyCat.js**, import the library and use it to copy content to the clipboard.

```js
import copy from 'copycat-js';

// Copy a simple string
await copy('Hello world');

// Copy a JSON object (with feedback)
await copy({ name: 'Parth' }, { type: 'json', feedback: 'JSON copied!' });

// Copy the value of an input element (with feedback)
const el = document.querySelector('input#email');
await copy(el, { feedback: true });
```

## API

### `copy(value, options) => Promise<boolean>`

* **value**: `string | object | Element`
  The content to be copied. Can be a string, a JSON object, or a DOM element (e.g., input).

* **options**:

  * `type`: (`'auto' | 'text' | 'json' | 'html' | 'color'`)
    Specifies the type of content being copied. Defaults to `'auto'` (auto-detection based on value).

  * `feedback`: (`boolean | string`)
    If `true`, shows a default toast message; if a string, shows a custom message.

  * `onSuccess`: (`function`)
    Callback function invoked on successful copy.

  * `onError`: (`function`)
    Callback function invoked on failure.

#### Example

```js
await copy('Hello, world!', { feedback: 'Copied to clipboard!' })
  .then(() => console.log('Success'))
  .catch((error) => console.error('Failed to copy:', error));
```

## Building and Publishing

### Build locally

To build **CopyCat.js** locally, run:

```bash
npm run build
```

### Testing

To run tests:

```bash
npm test
```

### Publish

To publish a new version of the package:

1. Bump the version in `package.json`.
2. Make sure you're logged in to npm: `npm login`.
3. Run the following command to publish:

```bash
npm publish
```

## Contributing

We welcome contributions! Please follow these guidelines:

* Open an issue or submit a pull request (PR).
* Follow conventional commit messages.
* Include tests for new features or bug fixes.

## License

[MIT License](LICENSE)
