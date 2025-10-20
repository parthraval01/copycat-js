// src/index.js
// CopyCat.js - main export
// Secure-first clipboard helper with robust fallback and simple feedback/hooks.
//
// API:
//   copy(value, options) -> Promise<boolean>
//
// options:
//   - type: 'auto'|'text'|'json'|'html'|'color'   (default 'auto')
//   - feedback: boolean | string  (show small toast; string is custom message)
//   - onSuccess: function(text) callback
//   - onError: function(error) callback

import { isSecureContextSafe } from './utils.js';
import { fallbackCopyText } from './fallback.js';
import { formatForCopy } from './format.js';
import { showToast } from './toast.js';

/**
 * copy
 * @param {*} value - string | object | Element
 * @param {{
 *   type?: string,
 *   feedback?: boolean|string,
 *   onSuccess?: (text:string)=>void,
 *   onError?: (err: Error)=>void
 * }} options
 * @returns {Promise<boolean>}
 */
export default async function copy(value, options = {}) {
    const opts = Object.assign({ type: 'auto', feedback: false }, options);

    // 1) Format to safe plain text (avoid copying HTML unless explicitly requested later)
    const text = formatForCopy(value, { type: opts.type });

    // 2) Prefer modern async Clipboard API when available & secure
    try {
        if (isSecureContextSafe() && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            await navigator.clipboard.writeText(text);
            if (typeof opts.onSuccess === 'function') opts.onSuccess(text);
            if (opts.feedback) showToast(typeof opts.feedback === 'string' ? opts.feedback : 'Copied!');
            return true;
        }
    } catch (err) {
        // If the Async API fails for any reason, we'll fall back below.
        // Do not throw — fallback is intended.
        // eslint-disable-next-line no-console
        console.warn('CopyCat: navigator.clipboard.writeText failed, attempting fallback', err);
    }

    // 3) Fallback to execCommand approach (synchronous)
    try {
        const ok = fallbackCopyText(text);
        if (!ok) throw new Error('fallback copy failed');
        if (typeof opts.onSuccess === 'function') opts.onSuccess(text);
        if (opts.feedback) showToast(typeof opts.feedback === 'string' ? opts.feedback : 'Copied!');
        return true;
    } catch (err) {
        if (typeof opts.onError === 'function') opts.onError(err);
        // eslint-disable-next-line no-console
        console.error('CopyCat: copy failed', err);
        return false;
    }
}
