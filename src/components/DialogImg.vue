<template>
  <!-- AFFICHAGE D'UNE IMAGE DANS LA CARD IMAGES DANS UNE BIERE -->
  <!-- V-DIALOG PERMET D'OUVRIR UNE FENTRE DE DIALOG POUR AGRANDIR L'IMAGE -->
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on }">
      <v-hover>
        <v-img
          v-on="on"
          :src="img.thumb.fr"
          max-height="100"
          max-width="100"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 18 : 2} pointer`"
        ></v-img>
      </v-hover>
    </template>

    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="second" flat @click="dialog = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>

      <v-img :src="img.display.fr" max-width="400"></v-img>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      hover: false,
      dialog: false
    }
  },
  props: {
    img: Object
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
