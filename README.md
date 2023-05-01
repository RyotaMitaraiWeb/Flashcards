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
npm run test:e2e:debug # disables headless mode, useful for close inspection of specific tests
```

Unit tests are run with Vitest and E2E tests are run with Playwright.

Some components rely on Vuetify components that can only be rendered in ``v-layout`` and similar tags. When unit testing those, most components in this project provide a ``[Component]TestWrapper.test.vue`` file. Import this one and render it instead of the normal component.

## Required environment variables
Create an ``.env`` file in the root of the project and populate it with the following variables:

```bash
VITE_API_URL="your_api_url"
VITE_API_SNACKBAR_TIMEOUT="10000" # Time until a snackbar disappears, expressed in milliseconds
```

## Structure
* ``components`` - holds all components in the project, each in its own subfolder. Documentation with more detailed information is provided for each component in its respective subfolder.
* * **Note:** in some cases, you may see files with a name pattern like ``ComponentTestWrapper.vue.test``. Those are meant to be rendered **only** in testing environments and should not be used in production environments. The reason for those's existence is so that the component that has to be tested can be injected easily into a ``v-layout`` component (or another Vuetify component) instead of having to configure this in the tests themselves.
* ``constants`` - holds objects with various constant values. The current ones consist of:
* * ``allowedPreferences`` - valid themes and palette colors.
* * ``api`` - the various API endpoints to which you can send requests. Each endpoint property is preppended by the ``VITE_API_URL`` environment variable automatically, so you do not have to provide it with each request yourself.
* * ``colors`` - the hex values of each valid palette color from ``allowedPreferences``.
* * ``httpstatus`` - an enum that provides verbose formatting of all HTTP status codes that appear at least once within the application.
* * ``invalidActionsMessages`` - provides messages for invalid actions like failed login, unauthorized entry, and etc., those are typically displayed with a snackbar.
* * ``succesActionsMessages`` - provides messages for successful actions (like a successful login), those are typically displayed with a snackbar
* * ``validationErrorMessages`` - messages related to failed validations (e.g. message for when the username is too short).
* * ``validationRules`` - values for validation, e.g. the minimum length of a username, the minimum amount of flashcards in a deck, and so on.
* ``guards`` - contains route guards to prevent unauthorized access to desired pages. Check the subfolder for more information on each guard.
* ``router`` - holds all files related to Vue Router.
* ``stores`` - holds all Pinia states. Check the subfolder for more information on each state and when to use them
* ``types`` - holds all types, split into subfolders matching the modules where they are used (e.g. all interfaces related to Pinia states are stored in the subfolder ``store``)
* ``util`` - holds various utility/helper functions that make certain tasks easier. Check each function's subfolder for more detailed documentation on their usage and functionality.
* ``views`` - holds all ``vue`` files that will be provided to the Vue router for rendering. ``vue`` files are split in subfolders based on the paths where they will be rendered (index pages like ``/`` are placed in subfolder ``index``), which is where you can find more-detailed documentation about the pages.

**Note:** this project uses SCSS as a CSS pre-processor.

## License
MIT