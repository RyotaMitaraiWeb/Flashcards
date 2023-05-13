<script setup lang="ts">
import type { ICatalogueDeck } from '../../../../types/components/decks';
import { dateFormatter } from '../../../../util/dateFormatter/dateFormatter';

export interface ICatalogueDeckItem {
  deck: ICatalogueDeck;
}

const props = defineProps<ICatalogueDeckItem>();
const subtitle = dateFormatter(props.deck.createdAt, props.deck.updatedAt);
</script>

<template>
  <article class="catalogue-item">
    <v-card>
      <v-card-title class="catalogue-title">
        {{ deck.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ subtitle }}
      </v-card-subtitle>
      <v-card-text>
        {{ deck.description }}
      </v-card-text>
      <v-card-actions>
        <v-btn 
          variant="flat"
          color="primary"
          class="catalogue-button"
          :to="`/decks/${deck.id}`"
          ripple
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-arrow-right-bold"></v-icon>
          </template>
          To deck
        </v-btn>
      </v-card-actions>
  </v-card>
  </article>
</template>

<style lang="scss" scoped>
.catalogue-item {
  width: 60vw;
  margin: 0 auto;
  margin-bottom: 20px;

  .catalogue-title {
    font-size: 20pt;

    @media screen and (max-width: 600px) {
      font-size: initial;
    }
  }

  .catalogue-button {
    margin-left: auto;
  }
}
</style>