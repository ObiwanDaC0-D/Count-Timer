# Count Timer

A minimalist, standalone count-up and countdown timeline.

## Features
- Past and future events, automatic or forced counting direction
- Optional event times and precise seconds display
- Custom categories, collapse/expand, category accent colors
- Grouped and all-events views; search, time filters, multiple sorts
- Desktop drag-and-drop and mobile touch/pointer reordering for events and categories
- Recurring weekly, monthly, and yearly dates with calendar-aware month-end and leap-year handling
- Duplicate an existing event from its editor
- Dark/light theme, local browser persistence, JSON import/export

- Installable PWA with offline app-shell caching and custom icon

## Run
Open `index.html` in a modern browser, or enable GitHub Pages in **Settings → Pages → Deploy from a branch → main / (root)**.

## Data and limitations
Events are saved in this browser's localStorage, not synced across devices. Export JSON backups regularly. Mobile reordering uses pointer events and should be tested on real iOS and Android devices. Browser storage is device-specific. iOS installation uses Safari's Share → Add to Home Screen rather than the in-page install button. This initial version has not undergone automated cross-browser testing. GitHub Pages deployment must be enabled separately.
