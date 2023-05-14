# Index pages

## Home
When the user is logged in, this page displays all decks they have bookmarked. When they are not logged in, it will display a message prompting the user to authenticate.

If the user is logged in, but decks cannot be retrieved, an error message will be displayed.

## Register
This page is used by users to register their accounts.

A registration happens by providing a valid username and password.

A username is valid if:
* is between 5 and 15 characters
* is alphanumeric (consists only of letters and/or numbers)
* does not already exist

A password is valid if:
* is at least 6 characters long

A successful registration will create a session for the user and the user will be redirected to the home page.

The page cannot be accessed by people that currently have a valid session

## Login
This page is used by users to log into their accounts. This is done by providing a username and a password.

If the credentials are valid, a new session will be created for the user and they will be redirected to the home page.

The page cannot be accessed by people that currently have a valid session

# Logout
This page is a renderless component. Upon load, the JWT in localStorage's ``accessToken`` will be deleted (and become unusable), the user's state will be restarted and the user will be redirected back to the home page.

The page cannot be accessed by guests.

# PageNotFound
This page is rendered if the user accesses a non-existant route or if the resource they are requesting (e.g. a deck) does not exist.