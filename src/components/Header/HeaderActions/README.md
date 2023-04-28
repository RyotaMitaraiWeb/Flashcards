# HeaderActions

## Usage
```vue
<HeaderActions></HeaderActions>
```

Renders two ``<LinkButton>`` tags and one ``<SettingsButton>`` tag. The two ``<LinkButton>``s are as follows:
* If the user's ``id`` in the uset store is 0 (aka the user is a guest), the links are ones that lead to the ``/login`` and ``/register`` pages
* Otherwise, the links lead to the ``/account/decks`` and ``/logout`` pages.