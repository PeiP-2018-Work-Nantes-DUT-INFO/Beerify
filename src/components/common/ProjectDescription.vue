<template>
  <div>
    <v-flex xs12 text-xs-center mt-5 mb-5>
      {{ $t('landing.PROJECT_DESCRIPTION') }}
      <br />
      <br />
      <v-flex xs12 text-xs-center mt-5 mb-5 mx-auto>
        <v-img width="100" src="/ESA-Dev-Board.png" />
        <v-img width="100" src="/Nantes-Brewers-Alliance.png" />
      </v-flex>
    </v-flex>

    <v-flex xs12 text-xs-center mb-5>
      {{ $t('landing.DESCRIPTION_VUE') }}
      <br />
    </v-flex>
  </div>
</template>

<script>
export default {
  name: 'ProjectDescription'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Cookie');
</style>
