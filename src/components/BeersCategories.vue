<template>
  <v-container fluid>
    <Heading :title="$t('categories.TITLE')" />
    <Description :description="$t('categories.DESCRIPTION')" />
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex
          v-for="cat in categories"
          :key="cat.value"
          @click="goTo(cat)"
          xs12
          md4
        >
          <v-item>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :color="hover ? 'primary' : ''"
                class="d-flex align-center"
                height="200"
              >
                <v-scroll-y-transition>
                  <div class="display-2 text-xs-center">
                    {{ cat.text }}
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-hover>
          </v-item>
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
      titleTemplate: `${this.$t('categories.TITLE')} - %s`
    }
  },
  computed: {
    displayLocale() {
      return this.$i18n.locale
    },
    categories() {
      return this.$store.state.beersCategories.categories
    }
  },
  watch: {
    displayLocale() {
      this.getCategories()
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
