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

    // ── Create the backdrop overlay once ────────────────────────────────
    function initOverlay() {
        if (document.getElementById('command-blur')) return;
        var workbench = document.querySelector('.monaco-workbench');
        if (!workbench) return;
        var overlay = document.createElement('div');
        overlay.id = 'command-blur';
        workbench.appendChild(overlay);
    }

    // ── Show backdrop blur ─────────────────────────────────────────────
    function showBlur() {
        var overlay = document.getElementById('command-blur');
        if (overlay) overlay.classList.add('visible');
        setStickyWidgetsOpacity(0);
    }

    // ── Hide backdrop blur ─────────────────────────────────────────────
    function hideBlur() {
        var overlay = document.getElementById('command-blur');
        if (overlay) overlay.classList.remove('visible');
        setStickyWidgetsOpacity(1);
    }

    // ── Wait for the command palette widget, then observe it ───────────
    var poll = setInterval(function () {
        var widget = document.querySelector('.quick-input-widget');
        if (!widget) return;

        clearInterval(poll);

        initOverlay();

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
