<p align="center">
  <img src="https://img.shields.io/badge/design-Apple%20Minimal-black?style=flat-square" alt="Design Language" />
  <img src="https://img.shields.io/badge/colors-theme%20inherited-blue?style=flat-square" alt="Colors" />
  <img src="https://img.shields.io/badge/engine-Custom%20CSS%20%2B%20JS-purple?style=flat-square" alt="Engine" />
</p>

# Apple Minimal — VS Code Custom Theme Kit

> Make VS Code feel like a native macOS app — Safari pill tabs, vibrancy surfaces, generous radii, smooth spring transitions — on top of **any** color theme you choose.

This kit **never overrides your selected theme's colors**. It inherits everything via `--vscode-*` CSS variables and only adds layout, spacing, depth, and motion polish.

---

## How It Works

```
┌─────────────────────────────────────────────────┐
│  Your VS Code Theme  (Catppuccin, GitHub, etc.) │  ← colors
├─────────────────────────────────────────────────┤
│  custom-vscode.css                              │  ← layout & polish
│  vscode-script.js                               │  ← interactions
└─────────────────────────────────────────────────┘
```

| File | What it does |
|:--|:--|
| `custom-vscode.css` | 20 sections of UI polish — pill tabs, vibrancy, rounded corners, macOS scrollbars, frosted glass menus |
| `vscode-script.js` | Command palette backdrop blur, idle sidebar dimming (90s), sash drag glow |
| `settings.json` | Opinionated editor settings + Vim keybinds (grouped by extension, easy to cherry-pick) |

---

## Quick Start

### 1. Install fonts

Install [JetBrains Mono](https://www.jetbrains.com/lp/mono/) **and** the [Nerd Font variant](https://www.nerdfonts.com/font-downloads) (`JetBrainsMono Nerd Font`) for terminal icon support (Oh My Posh, Starship, etc.).

### 2. Install the CSS loader extension

Install **Custom CSS and JS Loader** → [`be5invis.vscode-custom-css`](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css)

### 3. Add imports to your settings

Add this to your VS Code `settings.json`:

```jsonc
"vscode_custom_css.imports": [
  "https://raw.githubusercontent.com/rnldvrgl/vscode-custom-theme-kit/main/custom-vscode.css",
  "https://raw.githubusercontent.com/rnldvrgl/vscode-custom-theme-kit/main/vscode-script.js"
]
```

### 4. Enable & reload

1. Open Command Palette → **Enable Custom CSS and JS**
2. Reload VS Code

> **Note:** After each VS Code update, re-run **Enable Custom CSS and JS**. The "installation appears to be corrupt" warning is expected — dismiss it.

---

## What's Styled

| Area | Style |
|:--|:--|
| **Tabs** | Safari-style floating pills with shadow elevation |
| **Sidebar** | Finder-style rounded selection, no left borders |
| **Scrollbars** | macOS overlay — hidden until hover, pill-shaped |
| **Command Palette** | Centered, frosted glass, rounded search field, backdrop blur |
| **Context Menus** | macOS dropdown — rounded items, heavy blur |
| **Notifications** | Banner-style with frosted glass effect |
| **Activity Bar** | Dock-style icon scale on hover |
| **Panel Tabs** | Pill-style matching editor tabs |
| **Tooltips** | Rounded with blur and diffuse shadows |
| **Debug Toolbar** | Floating rounded bar with vibrancy |
| **Inputs** | Rounded with soft accent focus rings |
| **Buttons** | Pill-shaped with press-down micro-animation |

---

## Customization

### Accent Color

The **only hardcoded color** is the accent. Change it in `custom-vscode.css`:

```css
:root {
    --accent:     #818cf8;                       /* ← your color */
    --accent-dim: rgba(129, 140, 248, 0.10);     /* same RGB, low alpha */
    --accent-mid: rgba(129, 140, 248, 0.22);     /* same RGB, mid alpha */
    --accent-glow: rgba(129, 140, 248, 0.06);    /* same RGB, glow alpha */
}
```

Update the RGB values in all four variables to match your chosen color.

### Design Tokens

All tokens live at the top of `custom-vscode.css`:

| Token | Default | Controls |
|:--|:--|:--|
| `--accent` | `#818cf8` | Primary accent |
| `--bg-base` | *from theme* | Editor background |
| `--bg-surface` | *from theme* | Sidebar / panel backgrounds |
| `--bg-raised` | *from theme* | Widgets, tooltips |
| `--bg-overlay` | *from theme* | Menus, modals |
| `--blur-strength` | `16px` | Backdrop blur intensity |
| `--radius-sm / md / lg / xl` | `8 / 12 / 16 / 22px` | Border radii |
| `--transition` | `200ms` | Default animation speed |
| `--font-mono` | JetBrainsMono NFM stack | Monospace font |
| `--font-ui` | System UI stack | UI labels |

### Local Development

To test changes instantly without pushing to GitHub, use local file paths:

```jsonc
"vscode_custom_css.imports": [
  "file:///C:/Users/YourName/path/to/custom-vscode.css",
  "file:///C:/Users/YourName/path/to/vscode-script.js"
]
```

Switch back to the raw GitHub URLs when you're done.

---

## Vim Keybinds (Optional)

The `settings.json` includes VsCodeVim configuration with:

| Feature | Detail |
|:--|:--|
| Leader key | `<Space>` |
| Save / Quit | `<leader>w` / `<leader>q` |
| Rename | `<leader>r` |
| Quick Fix | `<leader>ca` |
| Line nav | `H` → `^`, `L` → `$` |
| Clipboard | System clipboard integration |
| Highlighted yank | Accent-colored flash (500ms) |
| Ctrl+P passthrough | `vim.handleKeys: { "<C-p>": false }` |

For the full keybind reference, see `settings.json` and look for `Vim section`.

> **Non-Vim users:** Simply don't install the `vscodevim.vim` extension. The CSS/JS works independently.

---

## Terminal Icons (Oh My Posh / Starship)

If prompt icons show as boxes:

1. **Verify the installed Nerd Font name** — Nerd Fonts v3 changed naming conventions:
   ```powershell
   [System.Drawing.Text.InstalledFontCollection]::new().Families |
     Where-Object { $_.Name -like "*Nerd*" -or $_.Name -like "*NFM*" } |
     Select-Object Name
   ```
2. **Use the exact name** in your `settings.json`:
   ```jsonc
   "terminal.integrated.fontFamily": "JetBrainsMono NFM, JetBrains Mono, monospace"
   ```
3. The CSS `--font-mono` variable should also list the Nerd Font variant first.

---

## Settings Sync

VS Code Settings Sync handles settings, extensions, keybindings, and UI state across devices. **Fonts and custom CSS/JS patching are per-device** — you'll need to:

- Install fonts on each machine
- Run **Enable Custom CSS and JS** on each machine

---

## Troubleshooting

| Problem | Fix |
|:--|:--|
| Styles not showing | Re-run **Enable Custom CSS and JS** → Reload |
| "Corrupt installation" warning | Expected — dismiss it |
| Ctrl+P not working (Vim) | Add `"vim.handleKeys": { "<C-p>": false }` to settings |
| Terminal icons are boxes | Check Nerd Font name (see section above) |
| Hover tooltips not appearing | Lower `editor.hover.delay` (default in kit: `300`) |
| Want to disable everything | Run **Disable Custom CSS and JS** → Reload |

---

## Contributing

Issues and pull requests are welcome. Include screenshots or before/after comparisons when possible.

---

<p align="center">
  <sub>Works with any VS Code color theme — Catppuccin, GitHub, One Dark, Dracula, Gruvbox, you name it.</sub>
</p>
