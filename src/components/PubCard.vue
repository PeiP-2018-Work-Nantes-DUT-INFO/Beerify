<template>
  <!-- CARD POUR AFFICHER UN BAR SUR LA PAGE D'ACCUEIL -->
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" dark>
      <!-- TEXT -->
      <v-card-title primary-title class="pt-3 pb-0">
        <div>
          <div class="title">{{ pub.name }}</div>
          <div class="body-1 font-weight-light">
            {{
              pub.street +
                ', ' +
                pub.city +
                ', ' +
                pub.state +
                ', ' +
                pub.zip +
                ', ' +
                pub.country
            }}
          </div>

          <!-- PHONE -->
          <div class="mt-1">
            <v-icon small>mdi-phone</v-icon>
            <span class="ml-2">{{ pub.phone }}</span>
          </div>
        </div>
      </v-card-title>

      <!-- LINKS -->
      <v-card-text
        class="py-2"
        :class="right ? 'text-xs-left' : 'text-xs-right'"
      >
        <!-- REVIEW -->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              icon
              color="primary"
              small
              v-on="on"
              :href="pub.reviewlink"
              target="_blank"
            >
              <v-icon small>mdi-star</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('landing.pub.REVIEW') }}</span>
        </v-tooltip>

        <!-- WEBSITE -->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              icon
              color="success"
              small
              v-on="on"
              :href="pub.reviewlink"
              target="_blank"
            >
              <v-icon small>mdi-open-in-new</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('landing.pub.WEBSITE') }}</span>
        </v-tooltip>

        <!-- MAP -->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              icon
              color="red lighten-2"
              small
              v-on="on"
              :href="pub.proxylink"
              target="_blank"
            >
              <v-icon small>mdi-map-marker-question</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('landing.pub.MAP') }}</span>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    pub: Object,
    right: Boolean
  }
}
</script>
