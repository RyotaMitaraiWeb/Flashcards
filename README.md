# Flashcards
A rewrite of my Flashcards application in Vue (TypeScript)

## How to run
```bash
npm install
npm run dev
```

## How to run tests
```bash
npm run test:unit
npm run test:e2e
```

Unit tests are run with Vitest and E2E tests are run with Playwright.

## Required environment variables
Create an ``.env`` file in the root of the project and populate it with the following variables:

```bash
VITE_API_URL="your_api_url"
```

## Structure
* ``components`` - holds all components in the project, each in its own subfolder. Documentation with more detailed information is provided for each component in its respective subfolder.
* ``constants`` - holds objects with various constant values. The current ones consist of:
* * ``allowedPreferences`` - valid themes and palette colors.
* * ``api`` - the various API endpoints to which you can send requests. Each endpoint property is preppended by the ``VITE_API_URL`` environment variable automatically, so you do not have to provide it with each request yourself.
* * ``colors`` - the hex values of each valid palette color from ``allowedPreferences``.
* * ``httpstatus`` - an enum that provides verbose formatting of all HTTP status codes that appear at least once within the application.
* ``guards`` - contains route guards to prevent unauthorized access to desired pages. Check the subfolder for more information on each guard.
* ``router`` - holds all files related to Vue Router.
* ``stores`` - holds all Pinia states. Check the subfolder for more information on each state and when to use them
* ``types`` - holds all types, split into subfolders matching the modules where they are used (e.g. all interfaces related to Pinia states are stored in the subfolder ``store``)
* ``util`` - holds various utility/helper functions that make certain tasks easier. Check each function's subfolder for more detailed documentation on their usage and functionality.
* ``views`` - holds all ``vue`` files that will be provided to the Vue router for rendering. ``vue`` files are split in subfolders based on the paths where they will be rendered (index pages like ``/`` are placed in subfolder ``index``), which is where you can find more-detailed documentation about the pages.

**Note:** this project uses SCSS as a CSS pre-processor.

## License
MIT