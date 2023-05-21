# MobileFlashcardForm

## Usage
<MobileFlashcardForm :flashcards="[{ /* insert props */ }]" @save-flashcards="saveFlashcards"></MobileFlashcardForm>

### Props
```typescript
interface IFlashcardForm {
  flashcards?: IFlashcard[];
}
```

Renders the flashcards form section of the create and edit pages, optionally populating it with existing flashcards if provided with props.

The component consists of the following elements:
* Two tab buttons that change which side of the current card is shown when clicked.
* Arrow buttons that are used to switch between the different cards. The left one switches to the previous card and the right one switches to the next one.
* * The left arrow button does not display when the user is on the first card and the right arrow button does not display when the user is on the last card. Note that their visibility is toggled with the ``visibility`` property in CSS.
* * Clicking on any of the arrows causes the card to switch to its front side.
* A ``<FlashcardInput>`` that passes the correct data and displays the correct side depending on which tab is currently active
* A counter that tracks which card the user is currently on (out of the total amount of cards that they have created)
* An "add" button which adds a new card to the submission upon click. This will also shift the user to that new card, regardless on which card they are currently.
* A "delete" button that removes the current card from the submission upon click. If the user is on any card other than the first one, the user is shifted to the card that is before the deleted one.

Each ``<FlashcardInput>`` emits an ``updateContent`` event when its textarea is updated. When that happens, this component emits a ``saveFlashcards`` event, passing the current state of the flashcards submission as an argument. This can be used so that a parent component can access the list of flashcards, which is particularly useful for submission and also saving the flashcards if the user switches to the basic info tab.

## Limitations
This component is designed for devices with a viewport width <= 768px. It is not recommended to render it in any context outside of this.