// src/utils.js
// Small shared helpers used across the library.
//
// Keep functions pure, well-documented and easy to test.

/**
 * isSecureContextSafe
 * Returns true when `navigator.clipboard` is available and the page is in a secure context.
 * Many browsers require HTTPS or localhost for clipboard.writeText to work.
 * @returns {boolean}
 */
export function isSecureContextSafe() {
    try {
        return !!(typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext);
    } catch (e) {
        // defensive: if environment denies access (e.g., SSR) return false
        return false;
    }
}

/**
 * safeStringify
 * Convert any input to safe, readable plain text for copying.
 * Objects -> pretty JSON; primitives -> String()
 * @param {*} value
 * @returns {string}
 */
export function safeStringify(value) {
    if (value === undefined || value === null) return '';
    if (typeof value === 'string') return value;
    try {
        return JSON.stringify(value, null, 2);
    } catch (err) {
        return String(value);
    }
}

/**
 * isElement
 * Minimal helper to detect DOM elements.
 * @param {*} v
 * @returns {boolean}
 */
export function isElement(v) {
    return typeof Element !== 'undefined' && v instanceof Element;
}
