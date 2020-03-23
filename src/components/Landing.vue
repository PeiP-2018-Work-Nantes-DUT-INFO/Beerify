<template>
  <!-- PAGE D'ACCUEIL -->
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('landing.TITLE')" />
      <Description :description="$t('landing.DESCRIPTION')" />
    </v-layout>

    <!-- SEARCH -->
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      :label="$t('dataTable.SEARCH')"
      class="mx-auto my-text-style"
      clearable
      single-line
      clear-icon="mdi-close"
      autofocus
    ></v-text-field>
    <ErrorMessage />
    <!-- METEO -->
    <v-card v-if="forecasts" class="mx-auto elevation-0" max-width="400">
      <v-card-title primary-title class="pt-3">
        <div>
          <div class="display-2 font-weight-light">{{ city.name }}</div>
          <span>{{ currentForecast.weather[0].description | capitalize }}</span>
        </div>
      </v-card-title>

      <v-card-text>
        <v-layout row align="center">
          <v-flex xs6 class="display-3 font-weight-thin">
            {{ currentForecast.main.temp.toFixed(1) }} °C
          </v-flex>
          <v-flex xs6>
            <v-icon size="112" ligth>
              {{ getCurrentForecastIcon }}
            </v-icon>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-list>
        <v-list-tile v-for="item in currentForecastItems" :key="item.title">
          <v-list-tile-content>
            <v-list-tile-title
              ><v-icon class="mr-3">{{ item.icon }}</v-icon
              >{{ item.title }}</v-list-tile-title
            >
          </v-list-tile-content>
          <v-list-tile-action class="mr-3">
            {{ item.value }}
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list class="transparent">
        <v-list-tile v-for="item in next3DaysForecastItems" :key="item.day">
          <v-list-tile-title>{{ item.day }}</v-list-tile-title>

          <v-list-tile-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-action class="mr-2 font-weight-light grey--text">
            {{ item.temp }}
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>

    <!-- TIMELINE -->
    <v-layout v-if="pubs.length > 0">
      <v-flex xs-3></v-flex>
      <v-flex xs-6>
        <template>
          <v-timeline>
            <v-timeline-item
              v-for="(pub, index) in pubs"
              :key="pub.name"
              color="red lighten-2"
              large
            >
              <template v-slot:icon>
                <v-icon size="36">mdi-store</v-icon>
              </template>
              <template v-slot:opposite>
                <span
                  v-if="index % 2 == 1"
                  class="display-3 font-weight-thin pr-4 d-inline"
                  >{{ (pub.overall / 20.0).toFixed(1) }}</span
                >
                <v-rating
                  class="hidden-sm-and-down d-inline"
                  background-color="primary"
                  hover
                  half-increments
                  large
                  readonly
                  dense
                  :value="pub.overall / 20.0"
                ></v-rating>
                <span
                  v-if="index % 2 == 0"
                  class="display-3 font-weight-thin pl-4 d-inline"
                  >{{ (pub.overall / 20.0).toFixed(1) }}</span
                >
              </template>
              <PubCard :pub="pub" :right="index % 2 == 0" />
            </v-timeline-item>
          </v-timeline>
        </template>
      </v-flex>
      <v-flex xs-3></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PubCard from '@/components/PubCard.vue'
import { mapActions } from 'vuex'
import { getFormat } from '@/utils/utils.js'

export default {
  data() {
    return {
      search: '',
      delayTimer: null
    }
  },
  computed: {
    city() {
      return this.$store.state.landing.city
    },
    forecasts() {
      return this.$store.state.landing.forecasts
    },
    currentForecast() {
      return this.$store.getters.currentForecast
    },
    next3DaysForecastItems() {
      return this.$store.getters.next3DaysForecast.map(forecast => {
        return {
          day: this.getFormat(forecast.dt),
          icon: this.getIcon(forecast.weather[0].icon),
          temp: `${Math.round(forecast.main.temp)} °C`
        }
      })
    },
    displayLocale() {
      return this.$i18n.locale
    },
    getCurrentForecastIcon() {
      return this.getIcon(this.currentForecast.weather[0].icon)
    },
    currentForecastItems() {
      return [
        {
          icon: 'mdi-weather-windy',
          title: this.$t('landing.weather.WIND'),
          value: `${this.currentForecast.wind.speed} ${this.$t(
            'landing.weather.WIND_UNIT'
          )}`
        },
        {
          icon: 'mdi-water-percent',
          title: this.$t('landing.weather.HUMIDITY'),
          value: `${this.currentForecast.main.humidity} %`
        },
        {
          icon: 'mdi-nuke',
          title: this.$t('landing.weather.PRESSURE'),
          value: `${this.currentForecast.main.pressure} ${this.$t(
            'landing.weather.PRESSURE_UNIT'
          )}`
        }
      ]
    },
    pubs() {
      return this.$store.getters.get5Pubs
    }
  },
  watch: {
    async search() {
      clearTimeout(this.delayTimer)
      if (this.search.length < 3) {
        return
      }
      this.delayTimer = setTimeout(() => {
        this.get3HoursForecastAndBars({
          ctn: 24,
          lang: this.displayLocale,
          q: this.search,
          units: 'metric'
        })
      }, 600)
    }
  },
  methods: {
    ...mapActions(['get3HoursForecastAndBars']),
    didSearched() {
      return this.city
    },
    getIcon(id) {
      switch (id.slice(0, 2)) {
        case '02':
          return 'fa-skyatlas'
        case '03':
          return 'fa-soundcloud'
        case '04':
          return 'fa-mixcloud'
        case '09':
          return 'fa-bath'
        case '10':
          return 'fa-shower'
        case '11':
          return 'fa-bolt'
        case '13':
          return 'fa-snowflake-o'
        case '50':
          return 'fa-ioxhost'
        case '01':
        default:
          return 'fa-sun-o'
      }
    },
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date * 1000, 'EEEE')
    }
  },
  filters: {
    capitalize(value) {
      if (!value) {
        return ''
      }
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  components: {
    PubCard
  }
}
</script>

<style scoped>
.my-text-style {
  max-width: 400px;
}
</style>
