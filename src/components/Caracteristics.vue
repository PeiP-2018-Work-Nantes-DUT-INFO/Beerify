<template>
  <!-- CARD DES CARACTERISTIQUES DANS UNE BIERE -->
  <v-card>
    <!-- TITRE -->
    <v-card-title>
      <h4>{{ $t('beers.CARACTERISTICS') }}</h4>
      <v-spacer></v-spacer>
      <v-icon>notes</v-icon>
    </v-card-title>

    <v-divider></v-divider>

    <!-- CONTENT => MARQUE, QUANTITE, EMBALLAGE -->
    <v-list dense>
      <v-list-tile v-if="brands">
        <v-list-tile-content>{{ $t('beers.BRANDS') }} :</v-list-tile-content>
        <v-list-tile-content class="align-end">
          {{ brands }}
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="quantity">
        <v-list-tile-content>{{ $t('beers.QUANTITY') }} :</v-list-tile-content>
        <v-list-tile-content class="align-end">
          {{ quantity }}
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="packagings">
        <v-list-tile-content>{{ $t('beers.PACKAGING') }} :</v-list-tile-content>
        <v-list-tile-content class="align-end">
          {{ packagings }}
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    brands: String,
    packagings: [String, Array],
    quantity: String
  }
}
</script>
