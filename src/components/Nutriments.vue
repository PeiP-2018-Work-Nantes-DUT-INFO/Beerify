<template>
  <v-card class="mt-3">
    <v-card-title>
      <h4>{{ $t('beers.NUTRIMENTS') }}</h4>
      <v-spacer></v-spacer>
      <v-icon>live_help</v-icon>
    </v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-tile>
        <v-list-tile-content></v-list-tile-content>
        <v-list-tile-content class="align-end">
          100 g / 100 ml
        </v-list-tile-content>
        <v-list-tile-content class="align-end">
          33 cl
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-for="row in rows" :key="row.text">
        <v-list-tile-content>
          {{ $t('beers.' + row.text) }} :
        </v-list-tile-content>
        <v-list-tile-content class="align-end">
          {{ nutriments[row.value100g] + ' ' + nutriments[row.unit] }}
        </v-list-tile-content>
        <v-list-tile-content class="align-end">
          {{ nutriments[row.value] + ' ' + nutriments[row.unit] }}
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      rows: [
        {
          text: 'ENERGY_KJ',
          value: 'energy_value',
          value100g: 'energy_100g',
          unit: 'energy_unit'
        },
        {
          text: 'ENERGY_KCAL',
          value: 'energy-kcal_value',
          value100g: 'energy-kcal_100g',
          unit: 'energy-kcal_unit'
        },
        {
          text: 'FAT',
          value: 'fat_value',
          value100g: 'fat_100g',
          unit: 'fat_unit'
        },
        {
          text: 'CARBS',
          value: 'carbohydrates_value',
          value100g: 'carbohydrates_100g',
          unit: 'carbohydrates_unit'
        },
        {
          text: 'PROTEIN',
          value: 'proteins_value',
          value100g: 'proteins_100g',
          unit: 'proteins_unit'
        },
        {
          text: 'SALT',
          value: 'salt_value',
          value100g: 'salt_100g',
          unit: 'salt_unit'
        },
        {
          text: 'SODIUM',
          value: 'sodium_value',
          value100g: 'sodium_100g',
          unit: 'sodium_unit'
        },
        {
          text: 'ALCOHOL',
          value: 'alcohol_value',
          value100g: 'alcohol_100g',
          unit: 'alcohol_unit'
        }
      ]
    }
  },
  props: {
    nutriments: Object,
    image: String
  }
}
</script>
