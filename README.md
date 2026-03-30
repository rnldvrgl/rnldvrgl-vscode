# VS Code Custom Theme Kit

A ready-to-use VS Code customization pack with a modern, minimal aesthetic. Easily change the accent color and apply a consistent look across devices.

## Files

| File | Purpose |
|---|---|
| `custom-vscode.css` | Main UI styles with CSS custom properties for easy theming |
| `vscode-script.js` | Backdrop blur effect for the command palette |
| `settings.json` | Example VS Code settings (no Vim) |
| `settings-vim.json` | Optional Vim keybinds — merge into your settings if you use Vim |

## Quick Start

1. Install [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (and optionally the Nerd Font variant).
2. Install the extension **Custom CSS and JS Loader** (`be5invis.vscode-custom-css`).
3. Add this to your VS Code `settings.json`:

```jsonc
"vscode_custom_css.imports": [
  "https://raw.githubusercontent.com/rnldvrgl/vscode-custom-theme-kit/main/custom-vscode.css",
  "https://raw.githubusercontent.com/rnldvrgl/vscode-custom-theme-kit/main/vscode-script.js"
]
```

4. Open the command palette and run **Enable Custom CSS and JS**.
5. Reload VS Code.

> After each VS Code update you need to re-run **Enable Custom CSS and JS**. The "installation appears to be corrupt" warning is expected and can be dismissed.

## Customization

### Accent Color

Open `custom-vscode.css` and change the `--accent` variable at the top:

```css
:root {
    --accent: #818cf8;          /* indigo — change to any color */
    --accent-dim: rgba(129, 140, 248, 0.12);
}
```

Update `--accent-dim`, `--accent-mid`, and `--accent-glow` to match (same RGB values, varying alpha). The rest of the CSS adapts automatically.

If you also use the `workbench.colorCustomizations` block from `settings.json`, replace every `#818cf8` occurrence there with your new color.

### Other Tokens

All design tokens are at the top of `custom-vscode.css`:

| Variable | Default | What it controls |
|---|---|---|
| `--accent` | `#818cf8` | Primary accent color |
| `--bg-base` | `#1a1e2e` | Deepest background (soft navy) |
| `--bg-surface` | `#222738` | Surface / panel backgrounds |
| `--bg-raised` | `#2a3045` | Elevated surfaces |
| `--bg-overlay` | `#333a52` | Overlay / modal backgrounds |
| `--blur-strength` | `12px` | Backdrop blur intensity |
| `--radius-xs/sm/md/lg/xl` | `4/6/10/14/20px` | Border radii |
| `--font-mono` | JetBrains Mono | Monospace font stack |
| `--font-ui` | System UI | UI labels font stack |

## Vim Keybinds (Optional)

Vim support is kept in a separate file so non-Vim users aren't affected.

To enable:

1. Install the **Vim** extension (`vscodevim.vim`).
2. Open `settings-vim.json` from this repo.
3. Copy all the settings and merge them into your VS Code `settings.json`.

The Vim config includes:
- `<Space>` as leader key
- Common bindings: `<leader>w` save, `<leader>q` quit, `<leader>r` rename, `<leader>ca` quick fix
- `H`/`L` mapped to `^`/`$` for faster line navigation
- System clipboard integration
- Highlighted yank feedback

## What Syncs via Settings Sync

VS Code Settings Sync handles: settings, extensions, keybindings, snippets, UI state, and profiles. Once enabled, manual copying of `settings.json` is usually not needed. **Fonts and custom CSS/JS patching are per-device.**

## Troubleshooting

| Problem | Fix |
|---|---|
| Styles not applied | Re-run **Enable Custom CSS and JS**, reload VS Code |
| URLs unreachable | Verify the raw GitHub URLs resolve in a browser |
| Fonts missing | Install JetBrains Mono on the OS |
| Want to disable | Run **Disable Custom CSS and JS**, reload |

## Contributing

Issues and pull requests are welcome. Include screenshots or before/after notes when possible.
