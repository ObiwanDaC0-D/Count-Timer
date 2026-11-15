# Count Timer

A minimalist, local-first countdown and elapsed-time tracker for GitHub Pages.

## Features

- Create, edit, duplicate, and delete dated events with optional exact times and notes
- Automatic count-up/countdown or explicit direction; weekly, monthly, yearly recurrence
- Per-event duration slider from years through seconds, including live hour/minute/second values
- Compact or expanded event cards, custom categories, drag-and-drop and move-up/down ordering
- Search, grouped/all views, filters, sorting, dark/light theme
- Installable PWA with offline asset caching
- JSON import/export and one-step restoration of the snapshot saved before the last import

## Architecture

- `index.html`: accessible page shell and event forms
- `styles.css`: responsive layout and themes
- `time-engine.js`: date parsing, recurrence, duration calculations
- `storage.js`: legacy-compatible storage, validation, import and recovery
- `ui.js`: escaped event-duration markup
- `app.js`: event management, interactions, incremental countdown updates
- `sw.js`: offline caching
- `tests/`: Node built-in test runner regression tests

The application intentionally continues to read/write the **`count-timer-v1`** localStorage key, preserving previously saved data. Back up important data using **Export JSON** before major browser/device changes. Storage is local to the browser and does not sync between devices.

## Run and test

Open `index.html` in a modern browser, or enable GitHub Pages under **Settings → Pages → Deploy from a branch → main / (root)**.

With Node.js 22+:

```sh
node --test tests/*.test.cjs
node --check app.js
```

GitHub Actions also runs syntax checks and regression tests on pushes to `main`.

## Notes

- Date-only events use local calendar days for the headline count and local-midnight precision for the detailed slider.
- Recurrence counts toward the next occurrence; it does not track cumulative elapsed time since the original recurring event.
- Dragging is available in Custom order with search/filters cleared; move-up/down buttons are an alternative.
- Mobile layout, browser accessibility, and offline updates should still be tested on real iOS and Android devices.
- Import validates data and creates a recovery snapshot before replacement. Restore backup reverts to that snapshot.
