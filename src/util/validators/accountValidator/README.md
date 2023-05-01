# accountValidator
A validator for usernames and passwords during registration

## Methods
```typescript
function minUsernameLength(value: string = ''): string | boolean
```
Validates if the username has the required minimum amount of characters.

```typescript
function maxUsernameLength(value: string = ''): string | boolean
```
Validates if the username does not exceed the allowed maximum amount of characters. Because the default value is an empty string, calling this method without an argument will always return ``true``.

```typescript
function alphanumericUsername(value: string = ''): string | boolean
```
Validates whether the username is alphanumeric. An alphanumeric username is one that consists exclusively of letters and/or numbers. For example, "ryota1", "ryota", and "11111", are all alphanumeric. Usernames with spaces and special symbols (like @, !, #, and so on) will fail validation.

```typescript
async function uniqueUsername(value: string = 'a'): Promise<string | boolean>
```
Sends a request to the server endpoint ``/accounts/username/{username}`` (where ``{username}`` is ``value``). Returns ``true`` if the status code is 404. The error message it returns depends on whether the request failed (due to network failures) or if the server simply responded with 200 due to the username existing.

```typescript
function minPasswordLength(value: string = ''): string | boolean
```
Validates if the password has the required minimum amount of characters.