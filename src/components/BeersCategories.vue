<template>
  <v-container fluid>
    <Heading :title="$t('beers.categories.TITLE')" />
    <Description :description="$t('beers.categories.DESCRIPTION')" />
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex
          v-for="cat in categories"
          :key="cat.value"
          @click="goTo(cat)"
          xs12
          md4
        >
          <v-item-group>
            <v-item>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :color="hover ? 'primary darken-3' : ''"
                  class="d-flex align-center pointer"
                  :class="`elevation-${hover ? 18 : 2}`"
                  height="200"
                >
                  <v-scroll-y-transition>
                    <div class="display-1 text-xs-center">
                      {{ cat.text }}
                    </div>
                  </v-scroll-y-transition>
                </v-card>
              </v-hover>
            </v-item>
          </v-item-group>
        </v-flex>
      </v-layout>
    </v-container>
    <ErrorMessage />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('beers.categories.TITLE')} - %s`
    }
  },
  computed: {
    categories() {
      return this.$store.getters.tabCategories
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    ...mapActions(['getCategories']),
    goTo(item) {
      this.$router.push({
        name: 'beers-browser',
        query: {
          c: item.value
        }
      })
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
