# DeckForm

## Usage
```vue
<DeckForm context="create" :deck={/* insert props here */} ></DeckForm>
```

### Props
```typescript
interface IDeckForm {
  deck?: IDeckSubmission
  context: 'create' | 'edit';
}
```

Renders a ``<BasicData>`` and, depending on the viewport width, a ``<FlashcardForm>`` or ``<MobileFlashcardForm>``, optionally populating both with existing data in the context of editing, alongside two tab buttons to switch between them. The component listens for update emits from all child components and takes care of maintaining their states. The submit button is available in both sections.

``context`` determines whether the form is used for creating a new deck or editing an existing one, changing the endpoint to which the submission will be sent. This will also cause a different heading and submit button to display to the user.

The component renders a ``FlashcardForm`` when the viewport is > 768px and ``MobileFlashcardForm`` otherwise.

Within the component is exposed a ``validate`` function:

```typescript
function validate(value: string, ...rules: ValidatorFunction[]): boolean
```

This function can be used to easily determine whether a value is valid or not.

When the user clicks the submit button, the component will validate the title, description, and each flashcard. The following chain of operations happens:
* If the title or description is invalid, the component will switch to the basic info tab and display a snackbar that indicates that the user must check these two fields.
* If the user has less than the required minimum amount of flashcards, the tab will be switched to the flashcards section and a snackbar will be displayed to indicate this error.
* * This is normally not possible, because the buttons to remove a flashcard do not display when the user has fewer flashcards than the minimum amount required.
* If the title or description is valid and the user has the required minimum amount of flashcards, but a flashcard is invalid, the component will switch to the flashcards section and display a snackbar that indicates the number of the first flashcard that has an error (so if two or more flashcards have errors, the user will be informed of only the first error).
* If everything is valid, the server will send the submission to the corresponding endpoint (which is based on the ``context`` prop) with the correct request method. A successful submission will result in the user being redirected to the created/edited deck. A snackbar is displayed if the request fails due to a network error. If the request is invalid (e.g. the user managed to circumvent the validation through some means), no snackbar is displayed.


## Limitations
Switching directly to the invalid flashcard is currently impossible, as the index of the flashcards is maintained internally within the form components.



