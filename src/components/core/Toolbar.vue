<template>
  <div>
    <v-navigation-drawer v-model="sidebar" app disable-resize-watcher>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>{{ appTitle }}</v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="sidebar = !sidebar">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-group prepend-icon="fa-beer" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ $t('beersItems.BEERS') }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(item, index) in beersItems"
            :key="index"
            :to="{ name: item.link }"
            exact
          >
            <v-list-tile-content class="d-inline mt-3">
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <span class="hidden-md-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
      </span>
      <v-toolbar-title class="headline text-uppercase ml-0">
        <div v-resize-text>
          <router-link
            :to="{ name: 'landing' }"
            tag="span"
            style="cursor: pointer"
            >{{ appTitle }}</router-link
          >
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          flat
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
          :class="['hidden-sm-and-down', item.class]"
        >
          <v-icon>{{ item.icon }}</v-icon>
          &nbsp;{{ item.title }}
        </v-btn>

        <v-menu offset-y class="hidden-sm-and-down">
          <v-btn slot="activator" flat class="btnBeers">
            <v-icon>fa-beer</v-icon>
            &nbsp;{{ $t('beersItems.BEERS') }}
          </v-btn>
          <v-list>
            <v-list-tile
              active-class="white--text"
              v-for="(item, index) in beersItems"
              :key="index"
              :to="{ name: item.link }"
              exact
              :class="[item.class]"
            >
              <v-list-tile-title>
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <LocaleChanger />
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LocaleChanger from '@/components/core/LocaleChanger'
import ResizeText from 'vue-resize-text'

export default {
  name: 'Toolbar',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { name: 'msapplication-TileColor', content: '#ffc40d' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'apple-mobile-web-app-title',
          content: this.$store.getters.appTitle
        },
        { name: 'application-name', content: this.$store.getters.appTitle }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
        { rel: 'favicon', href: '/favicon.ico' }
      ]
    }
  },
  components: {
    LocaleChanger
  },
  directives: {
    ResizeText
  },
  data() {
    return {
      sidebar: false
    }
  },
  computed: {
    ...mapGetters(['appTitle']),
    beersItems() {
      return [
        {
          title: this.$t('beersItems.CATEGORIES'),
          link: 'beers-categories',
          icon: 'category',
          class: 'btnBeersCategories'
        },
        {
          title: this.$t('beersItems.BROWSE'),
          link: 'beers-browser',
          icon: 'search',
          class: 'btnBeersBrowser'
        }
      ]
    },
    menuItems() {
      return [
        {
          title: this.$t('menuItems.HOME'),
          link: 'landing',
          icon: 'mdi-home'
        },
        {
          title: this.$t('menuItems.ABOUT'),
          link: 'about',
          icon: 'mdi-help-circle-outline',
          class: 'btnAbout'
        }
      ]
    }
  }
}
</script>
