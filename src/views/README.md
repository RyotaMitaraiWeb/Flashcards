# Index pages

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