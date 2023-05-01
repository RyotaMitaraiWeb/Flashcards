# validators
This folder contains various validator functions

## Usage
Each validator represents an object of methods. Each method must do the following:

* Return ``true`` for successful validation and a string (error message) when validation fails
* Accept one parameter of type ``string``. It is recommended to give each parameter a default value as well (typically an empty string, but other values can also be used when appropriate).

Methods can be either synchronous or asynchronous.

## Types of validators
Currently, this project has the following validators:
* ``accountValidator``- validates the username and password during registration.

You can check each validator's subfolder for more documentation.