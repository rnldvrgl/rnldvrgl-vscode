(function () {
    'use strict';

    // ── Helpers ────────────────────────────────────────────────────────
    function setStickyWidgetsOpacity(value) {
        document.querySelectorAll('.sticky-widget').forEach(function (w) {
            w.style.opacity = value;
        });
        var tree = document.querySelector('.monaco-tree-sticky-container');
        if (tree) tree.style.opacity = value;
    }

    // ── Show backdrop blur ─────────────────────────────────────────────
    function showBlur() {
        var existing = document.getElementById('command-blur');
        if (existing) {
            // Already visible — make sure it's shown
            existing.classList.add('visible');
            return;
        }

        var workbench = document.querySelector('.monaco-workbench');
        if (!workbench) return;

        var overlay = document.createElement('div');
        overlay.id = 'command-blur';
        overlay.addEventListener('click', hideBlur);
        workbench.appendChild(overlay);

        // Trigger reflow so the CSS transition plays
        overlay.offsetHeight; // eslint-disable-line no-unused-expressions
        overlay.classList.add('visible');

        setStickyWidgetsOpacity(0);
    }

    // ── Hide backdrop blur (with fade-out) ─────────────────────────────
    function hideBlur() {
        var overlay = document.getElementById('command-blur');
        if (!overlay) return;

        overlay.classList.remove('visible');
        overlay.addEventListener('transitionend', function handler() {
            overlay.removeEventListener('transitionend', handler);
            overlay.remove();
        });

        setStickyWidgetsOpacity(1);
    }

    // ── Wait for the command palette widget, then observe it ───────────
    var poll = setInterval(function () {
        var widget = document.querySelector('.quick-input-widget');
        if (!widget) return;

        clearInterval(poll);

        // If already open on load
        if (widget.style.display !== 'none') showBlur();

        new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                if (mutations[i].attributeName === 'style') {
                    if (widget.style.display === 'none') {
                        hideBlur();
                    } else {
                        showBlur();
                    }
                }
            }
        }).observe(widget, { attributes: true });
    }, 500);

    // ── Keyboard shortcut listener (single, capture phase) ─────────────
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            hideBlur();
        }
    }, true);
})();
