<template>
  <div>
    <v-flex xs12 text-xs-center my-5>
      {{ $t('landing.PROJECT_DESCRIPTION') }}
    </v-flex>

    <v-flex xs12 my-5>
      <v-layout row justify-center>
        <v-img
          max-width="300"
          class="mx-3"
          :src="`${publicPath}Nantes-Brewers-Alliance.png`"
        />
        <v-img
          max-width="300"
          class="mx-3"
          :src="`${publicPath}ESA-Dev-Board.png`"
        />
      </v-layout>
    </v-flex>

    <v-flex xs12 text-xs-center my-5>
      {{ $t('landing.DESCRIPTION_VUE') }}
    </v-flex>
  </div>
</template>

<script>
export default {
  name: 'ProjectDescription',
  data() {
    return {
      publicPath: process.env.BASE_URL
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Cookie');
</style>
