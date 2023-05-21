# guards
Contains functions that can be supplied to Vue Router to prevent unauthorized access to desired pages.

## ``IsGuest``
Prevents access to the page if the user is not a guest. A guest is considered any user whose ``id`` in the ``user`` state is 0. If the user is not a guest, the guard will return a redirect object to the home page and display a snackbar to indicate the failed navigation.

## ``IsLoggedIn``
Prevents access to the page if the user is a guest. A guest is considered any user whose ``id`` in the ``user`` state is 0. If the user is a guest, the guard will return a redirect object to the login page and display a snackbar to indicate the failed navigation.

## ``IsOwner``
Prevents access to the page if the user is not the creator of the deck. This guard should be used after attaching a deck to the route meta with the ``getDeck`` resolver. If the user is not the creator of the deck, the guard will return a redirect object to the home page. If ``route.meta.deck`` is ``undefined``, then it will redirect the user to the not found page (this is normally handled by ``getDeck``).