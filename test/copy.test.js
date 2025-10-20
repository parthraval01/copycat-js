// test/copy.test.js
// Basic unit tests (Vitest) to check core behavior.
// Note: run with `npm test` (Vitest will use jsdom environment by default)

import { describe, it, expect, vi } from 'vitest';
import copy from '../src/index.js';

// Mock navigator.clipboard where needed
describe('copy()', () => {
    it('copies text using fallback when clipboard API not available', async () => {
        // Ensure global navigator.clipboard is undefined
        const originalClipboard = global.navigator?.clipboard;
        if (global.navigator) global.navigator.clipboard = undefined;

        const result = await copy('hello world');
        expect(result).toBe(true);

        // restore
        if (global.navigator) global.navigator.clipboard = originalClipboard;
    });

    it('handles objects (json) and returns true', async () => {
        const obj = { a: 1 };
        const result = await copy(obj, { type: 'json' });
        expect(result).toBe(true);
    });
});
