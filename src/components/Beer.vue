<template>
  <v-container v-if="this.beer" fluid>
    <!-- HEAD -->
    <v-layout row wrap>
      <Heading :title="this.appTitle" />
    </v-layout>

    <!-- BODY -->
    <v-layout row class="mt-5">
      <!-- COLONNE GAUCHE -->
      <v-flex md1 lg2 xl3 class="hidden-sm-and-down"></v-flex>

      <!-- COLONNE CENTRALE -->
      <v-flex xs12 md10 lg8 xl6>
        <v-img
          :src="beer.image_front_url"
          max-width="200"
          max-height="500"
          class="mx-auto"
        ></v-img>

        <!-- CARACTERISTIQUES -->
        <Caracteristics
          class="mt-4"
          :brands="beer.brands"
          :packagings="beer.packaging"
          :quantity="beer.quantity"
        />

        <!-- INGREDIENTS -->
        <v-card class="mt-4">
          <v-card-title>
            <h4>{{ $t('beers.INGREDIENTS') }}</h4>
            <v-spacer></v-spacer>
            <v-icon>local_dining</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>{{ beer.ingredients_text }}</div>
          </v-card-text>
        </v-card>

        <!-- CATEGORIES -->
        <v-card class="mt-4">
          <v-card-title>
            <h4>{{ $t('beers.CATEGORIES') }}</h4>
            <v-spacer></v-spacer>
            <v-icon>local_offer</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>{{ beer.categories }}</div>
          </v-card-text>
        </v-card>

        <!-- NUTRIMENTS -->
        <Nutriments
          :nutriments="beer.nutriments"
          :image="beer.image_nutrition_url"
        />

        <!-- LABELS -->
        <v-card class="mt-4">
          <v-card-title>
            <h4>{{ $t('beers.LABELS') }}</h4>
            <v-spacer></v-spacer>
            <v-icon>label</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>{{ beer.categories }}</div>
          </v-card-text>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content
                >{{ $t('beers.NOVA') }} :</v-list-tile-content
              >

              <v-list-tile-content class="align-end">
                {{ beer.nova_group }}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>

        <!-- INFOS -->
        <v-card class="mt-4">
          <v-card-title>
            <h4>{{ $t('beers.INFORMATIONS') }}</h4>
            <v-spacer></v-spacer>
            <v-icon>info</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile v-if="beer.manufacturing_places">
              <v-list-tile-action>
                <v-icon small>fa-industry</v-icon>
              </v-list-tile-action>
              <v-list-tile-content
                >{{ $t('beers.MANUFACTURING_PLACES') }} :</v-list-tile-content
              >
              <v-list-tile-content class="align-end">
                {{ beer.manufacturing_places }}
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="beer.link">
              <v-list-tile-action>
                <v-icon small>fa-external-link</v-icon>
              </v-list-tile-action>
              <v-list-tile-content
                >{{ $t('beers.WEBSITE') }} :</v-list-tile-content
              >
              <v-list-tile-content class="align-end">
                <a target="_blank" :href="beer.link">{{ beer.link }}</a>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="beer.stores">
              <v-list-tile-action>
                <v-icon small>storefront</v-icon>
              </v-list-tile-action>
              <v-list-tile-content
                >{{ $t('beers.STORES') }} :</v-list-tile-content
              >
              <v-list-tile-content class="align-end">
                {{ beer.stores }}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>

        <!-- IMAGES -->
        <v-card class="mt-4">
          <v-card-title>
            <h4>{{ $t('beers.IMAGES') }}</h4>
            <v-spacer></v-spacer>
            <v-icon>perm_media</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout wrap>
              <DialogImg
                v-for="(image, index) in beer.selected_images"
                :key="index"
                :img="image"
                class="ml-2"
              />
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- COLONNE DROITE -->
      <v-flex md1 lg2 xl3 class="hidden-sm-and-down"></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Caracteristics from '@/components/Caracteristics.vue'
import DialogImg from '@/components/DialogImg.vue'
import Nutriments from '@/components/Nutriments.vue'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('beers.TITLE')} - %s`
    }
  },
  components: {
    Caracteristics,
    DialogImg,
    Nutriments
  },
  computed: {
    beer() {
      return this.$store.state.beersBrowser.selectedBeer
    },
    appTitle() {
      if (!this.beer) {
        return this.$t('beers.TITLE')
      }
      const name = this.beer.product_name
        ? this.beer.product_name
        : this.beer.product_name_en
      return this.htmlDecode(name.charAt(0).toUpperCase() + name.slice(1))
    }
  },
  methods: {
    htmlDecode(input) {
      const e = document.createElement('textarea')
      e.innerHTML = input
      // handle case of empty input
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }
  },
  beforeCreate() {
    if (!this.$store.state.beersBrowser.selectedBeer) {
      this.$router.replace('/')
    }
  }
}
</script>
