// src/toast.js
// Very small, accessible toast helper. Optional: used when user passes feedback:true or a string message.

const TOAST_ID = 'copycat-toast-element';

/**
 * showToast
 * Creates or reuses a small toast element and shows the message briefly.
 * Non-blocking and resilient.
 * @param {string} message
 */
export function showToast(message = 'Copied!') {
    try {
        let el = document.getElementById(TOAST_ID);
        if (!el) {
            el = document.createElement('div');
            el.id = TOAST_ID;
            el.setAttribute('role', 'status');
            el.setAttribute('aria-live', 'polite');
            // Minimal inline style to avoid requiring external CSS
            el.style.position = 'fixed';
            el.style.right = '12px';
            el.style.bottom = '12px';
            el.style.padding = '8px 12px';
            el.style.fontSize = '13px';
            el.style.background = 'rgba(0,0,0,0.8)';
            el.style.color = '#fff';
            el.style.borderRadius = '8px';
            el.style.boxShadow = '0 6px 18px rgba(0,0,0,0.2)';
            el.style.zIndex = '2147483647';
            el.style.transition = 'opacity 200ms ease';
            el.style.opacity = '0';
            document.body.appendChild(el);
        }

        el.textContent = message;
        // trigger show
        requestAnimationFrame(() => {
            el.style.opacity = '1';
        });

        clearTimeout(el._hideTimer);
        el._hideTimer = setTimeout(() => {
            el.style.opacity = '0';
        }, 1400);
    } catch (err) {
        // toast is best-effort — swallow errors
        // eslint-disable-next-line no-console
        console.warn('CopyCat: showToast failed', err);
    }
}
