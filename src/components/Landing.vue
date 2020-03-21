<template>
  <v-container fluid>
    <!-- SEARCH -->
    <v-autocomplete
      chips
      clearable
      hide-details
      hide-selected
      item-text="name"
      item-value="symbol"
      label="Search for a town..."
      solo
      color="second"
    >
      <template v-slot:no-data>
        <v-list-tile>
          <v-list-tile-title>
            Search for your favorite
            <strong>City</strong>
          </v-list-tile-title>
        </v-list-tile>
      </template>
      <template v-slot:selection="{ item, selected }">
        <v-chip :selected="selected" color="blue-grey" class="white--text">
          <v-icon left>mdi-coin</v-icon>
          <span v-text="item.name"></span>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-tile-avatar
          color="indigo"
          class="headline font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="item.symbol"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mdi-coin</v-icon>
        </v-list-tile-action>
      </template>
    </v-autocomplete>

    <v-layout row wrap>
      <Heading :title="$t('landing.TITLE')" />
      <Description :description="$t('landing.DESCRIPTION')" />
    </v-layout>

    <!-- METEO -->
    <v-card class="mx-auto elevation-0" dark max-width="400">
      <v-card-title primary-title class="pt-3">
        <div>
          <div class="display-2 font-weight-light">{{ city }}</div>
          <span>{{ description }}</span>
        </div>
      </v-card-title>

      <v-card-text>
        <v-layout row align="center">
          <v-flex xs6 class="display-3 font-weight-thin">
            23&deg;C
          </v-flex>
          <v-flex xs6>
            <v-icon size="112" ligth>
              fa-sun-o
            </v-icon>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-list>
        <v-list-tile v-for="item in items" :key="item.title">
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
        <v-list-tile v-for="item in forecast" :key="item.day">
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
    <v-layout>
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
                <v-layout align-center>
                  <v-flex d-inline>
                    <span
                      v-if="index % 2 == 1"
                      class="display-3 font-weight-thin pl-5"
                      >{{ pub.overall / 20.0 }}</span
                    ></v-flex
                  >
                  <v-flex d-inline
                    ><v-rating
                      class="hidden-sm-and-down"
                      background-color="primary"
                      hover
                      half-increments
                      large
                      readonly
                      :value="pub.overall / 20.0"
                    ></v-rating
                  ></v-flex>
                  <v-flex d-inline
                    ><span
                      v-if="index % 2 == 0"
                      class="display-3 font-weight-thin pr-5"
                      >{{ pub.overall / 20.0 }}</span
                    ></v-flex
                  >
                </v-layout>
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

export default {
  data() {
    return {
      city: 'Paris',
      description: 'Mon, 12:30 PM, Mostly sunny',
      forecast: [
        {
          day: 'Tuesday',
          icon: 'mdi-white-balance-sunny',
          temp: '24\xB0/12\xB0'
        },
        {
          day: 'Wednesday',
          icon: 'mdi-white-balance-sunny',
          temp: '22\xB0/14\xB0'
        },
        {
          day: 'Thursday',
          icon: 'mdi-cloud',
          temp: '25\xB0/15\xB0'
        }
      ],
      items: [
        {
          icon: 'mdi-weather-windy',
          title: 'Wind',
          value: '23 km/h'
        },
        {
          icon: 'mdi-water-percent',
          title: 'Humidity',
          value: '48 %'
        },
        {
          icon: 'mdi-nuke',
          title: 'Pressure',
          value: '1018 Pa'
        }
      ],
      pubs: [
        {
          name: 'Oskar Blues Grill and Brewery',
          status: 'Brewpub',
          rewiewlink: 'https://beermapping.com/location/972',
          proxylink:
            'http://beermapping.com/maps/proxymaps.php?locid=972&amp;d=5',
          blogmap:
            'http://beermapping.com/maps/blogproxy.php?locid=972&amp;d=1&amp;type=norm',
          street: '303 Main Street',
          city: 'Lyons',
          state: 'CO',
          zip: '80540',
          country: 'United States',
          phone: '(303) 823-6685',
          overall: '90'
        },
        {
          name: 'Oskar Reds Grill and Brewery',
          status: 'Brewpub',
          rewiewlink: 'https://beermapping.com/location/972',
          proxylink:
            'http://beermapping.com/maps/proxymaps.php?locid=972&amp;d=5',
          blogmap:
            'http://beermapping.com/maps/blogproxy.php?locid=972&amp;d=1&amp;type=norm',
          street: '303 Main Street',
          city: 'Lyons',
          state: 'CO',
          zip: '80540',
          country: 'United States',
          phone: '(303) 823-6685',
          overall: '64'
        },
        {
          name: 'Oskar Greens Grill and Brewery',
          status: 'Brewpub',
          rewiewlink: 'https://beermapping.com/location/972',
          proxylink:
            'http://beermapping.com/maps/proxymaps.php?locid=972&amp;d=5',
          blogmap:
            'http://beermapping.com/maps/blogproxy.php?locid=972&amp;d=1&amp;type=norm',
          street: '303 Main Street',
          city: 'Lyons',
          state: 'CO',
          zip: '80540',
          country: 'United States',
          phone: '(303) 823-6685',
          overall: '80'
        }
      ]
    }
  },
  components: {
    PubCard
  }
}
</script>
