// src/fallback.js
// Fallback copy mechanism using a temporary textarea + document.execCommand('copy').
// This is used when the Async Clipboard API is unavailable.

/**
 * fallbackCopyText
 * @param {string} text
 * @returns {boolean} true if copy claimed success
 */
export function fallbackCopyText(text) {
    try {
        const textarea = document.createElement('textarea');
        // Make it focusable but invisible and non-intrusive
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        textarea.style.opacity = '0';
        textarea.setAttribute('aria-hidden', 'true');

        document.body.appendChild(textarea);

        // Save selection to restore later
        const selection = document.getSelection();
        const selectedRanges = [];
        if (selection && selection.rangeCount > 0) {
            for (let i = 0; i < selection.rangeCount; i++) {
                selectedRanges.push(selection.getRangeAt(i));
            }
        }

        textarea.focus();
        textarea.select();

        let success = false;
        try {
            success = document.execCommand('copy');
        } catch (err) {
            success = false;
        }

        // clean up textarea
        document.body.removeChild(textarea);

        // restore previous selection
        if (selection) {
            selection.removeAllRanges();
            for (const r of selectedRanges) selection.addRange(r);
        }

        return success;
    } catch (err) {
        // defensive - if anything goes wrong, report failure
        // eslint-disable-next-line no-console
        console.warn('CopyCat fallbackCopyText failed', err);
        return false;
    }
}
