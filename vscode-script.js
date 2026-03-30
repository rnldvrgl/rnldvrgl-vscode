(function () {
    'use strict';

    // ── Constants ──────────────────────────────────────────────────────
    var IDLE_MS = 90000; // 90 seconds before sidebar dims
    var POLL_INTERVAL = 400;

    // ── Helpers ────────────────────────────────────────────────────────
    function setStickyWidgetsOpacity(value) {
        document.querySelectorAll('.sticky-widget').forEach(function (w) {
            w.style.opacity = value;
        });
        var tree = document.querySelector('.monaco-tree-sticky-container');
        if (tree) tree.style.opacity = value;
    }

    function $(selector) {
        return document.querySelector(selector);
    }

    // ── Create the backdrop overlay once ────────────────────────────────
    function initOverlay() {
        if (document.getElementById('command-blur')) return;
        var workbench = $('.monaco-workbench');
        if (!workbench) return;
        var overlay = document.createElement('div');
        overlay.id = 'command-blur';
        workbench.appendChild(overlay);
    }

    // ── Show / hide backdrop blur ──────────────────────────────────────
    function showBlur() {
        var overlay = document.getElementById('command-blur');
        if (overlay) {
            overlay.classList.add('visible');
            document.body.classList.add('command-palette-open');
        }
        setStickyWidgetsOpacity(0);
    }

    function hideBlur() {
        var overlay = document.getElementById('command-blur');
        if (overlay) {
            overlay.classList.remove('visible');
            document.body.classList.remove('command-palette-open');
        }
        setStickyWidgetsOpacity(1);
    }

    // ── Focus mode: dim sidebar after idle ─────────────────────────────
    var idleTimer = null;

    function resetIdleTimer() {
        if (idleTimer) clearTimeout(idleTimer);
        var sidebar = $('.part.sidebar');
        if (sidebar && sidebar.style.opacity === '0.45') {
            sidebar.style.transition = 'opacity 0.4s ease';
            sidebar.style.opacity = '';
        }
        idleTimer = setTimeout(function () {
            var sb = $('.part.sidebar');
            if (sb) {
                sb.style.transition = 'opacity 2s ease';
                sb.style.opacity = '0.45';
            }
        }, IDLE_MS);
    }

    // Use passive listeners for performance
    document.addEventListener('keydown', resetIdleTimer, true);
    document.addEventListener('mousemove', resetIdleTimer, { passive: true, capture: true });
    resetIdleTimer();

    // ── Smooth panel resize indicator ──────────────────────────────────
    // Adds a subtle accent glow to sash elements during drag
    document.addEventListener('mousedown', function (e) {
        var sash = e.target.closest('.monaco-sash');
        if (!sash) return;
        sash.style.transition = 'background-color 0.2s ease';
        sash.style.backgroundColor = 'rgba(129, 140, 248, 0.15)';

        function cleanup() {
            sash.style.backgroundColor = '';
            document.removeEventListener('mouseup', cleanup);
        }
        document.addEventListener('mouseup', cleanup);
    }, true);

    // ── Wait for the command palette widget, then observe it ───────────
    var poll = setInterval(function () {
        var widget = $('.quick-input-widget');
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
    }, POLL_INTERVAL);

    // ── Keyboard shortcut listener (single, capture phase) ─────────────
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            hideBlur();
        }
    }, true);
})();
