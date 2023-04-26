# localStoragePreferences
Contains functions for retrieving preferences from ``localStorage`` or supplying valid ones when such don't exist in the storage.

```typescript
function getLocalStorageTheme(): theme
```
Retrieves the value of ``theme`` in ``localStorage`` and returns said value if it exists in ``allowedPreferences.themes``, otherwise returns the string at index 0 of ``allowedPreferences.themes``.

```typescript
function getLocalStoragePalette(): palette
```
Retrieves the value of ``palette`` in ``localStorage`` and returns said value if it exists in ``allowedPreferences.palette``, otherwise returns the string at index 0 of ``allowedPreferences.palettes``.