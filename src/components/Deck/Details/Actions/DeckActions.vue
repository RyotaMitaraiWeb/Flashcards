<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../../stores/user/user';
import EditButton from '../../Buttons/EditButton/EditButton.vue';
import DeleteButton from '../../Buttons/DeleteButton/DeleteButton.vue';
import type { IDeck } from '../../../../types/components/decks';
import BookmarkButton from '../../Buttons/BookmarkButton/BookmarkButton.vue';
import UnbookmarkButton from '../../Buttons/UnbookmarkButton/UnbookmarkButton.vue';
import StartButton from '../../Buttons/StartButton/StartButton.vue';
import { ref } from 'vue';

export interface IDeckActions {
  deck: IDeck;
}

defineEmits(['start']);

const props = defineProps<IDeckActions>();
const userStore = useUserStore();
const userRef = storeToRefs(userStore);
const user = userRef.user;

const hasBeenBookmarked = ref(props.deck.bookmarked);

function bookmark() {
  hasBeenBookmarked.value = true;
}

function unbookmark() {
  hasBeenBookmarked.value = false;
}

</script>

<template>
  <v-card title="Actions" id="decks-actions">
    <v-card-actions id="actions">
      <div class="actions">
        <StartButton @click.prevent="$emit('start')"></StartButton>
        <template v-if="user.id === deck.authorId">
          <EditButton :id="deck.id"></EditButton>
          <DeleteButton :id="deck.id"></DeleteButton>
        </template>
        <template v-if="!hasBeenBookmarked && user.id !== deck.authorId && user.id !== 0">
          <BookmarkButton :id="deck.id" @bookmark="bookmark"></BookmarkButton>
        </template>
        <template v-if="hasBeenBookmarked && user.id !== deck.authorId">
          <UnbookmarkButton :id="deck.id" @unbookmark="unbookmark"></UnbookmarkButton>
        </template>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
#decks-actions {
  text-align: center;
  width: 400px;
  height: 400px;

  @media screen and (max-width: 420px) {
    width: 300px;
    height: 300px;
  }

  #actions {
    display: flex;
    justify-content: center;

    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      gap: 10px;

      @media screen and (max-width: 420px) {
          gap: 40px;
        }

      .action-btn {
        width: 350px;
        text-align: center;
        margin: 0;

        @media screen and (max-width: 420px) {
          width: 200px;
          
        }
      }
    }
  }
}
</style>