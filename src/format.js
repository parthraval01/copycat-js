// src/format.js
// Detects and formats the input so we reliably copy plain text that makes sense for the user.

/**
 * detectType
 * Returns a type string based on value shape.
 * @param {*} value
 * @returns {'text'|'json'|'element'|'color'}
 */
export function detectType(value) {
    if (typeof value === 'string') {
        // quick color detection (hex or rgb())
        const isHex = /^#([0-9a-fA-F]{3}){1,2}$/.test(value);
        const isRgb = /^rgb/i.test(value);
        if (isHex || isRgb) return 'color';
        return 'text';
    }
    if (typeof Element !== 'undefined' && value instanceof Element) return 'element';
    if (typeof value === 'object') return 'json';
    return 'text';
}

import { safeStringify, isElement } from './utils.js';

/**
 * formatForCopy
 * Convert the input to textual content suitable for clipboard.copy.
 * Avoid copying raw HTML by default - prefer text/JSON.
 * @param {*} value
 * @param {{ type?: string }} opts
 * @returns {string}
 */
export function formatForCopy(value, opts = {}) {
    const forcedType = opts.type;
    const type = forcedType && forcedType !== 'auto' ? forcedType : detectType(value);

    if (type === 'element' || isElement(value)) {
        const el = value;
        // For form elements prefer .value; otherwise innerText -> textContent
        if ('value' in el && el.value !== undefined && el.value !== null) return String(el.value);
        if (el.innerText && el.innerText.trim().length) return el.innerText;
        return el.textContent || '';
    }

    if (type === 'json') {
        return safeStringify(value);
    }

    // color or text default
    return String(value);
}
