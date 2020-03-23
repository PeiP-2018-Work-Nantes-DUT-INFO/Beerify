<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm12 md4 mt-3 pl-4>
        <v-toolbar-title>{{ $t('beers.TITLE') }}</v-toolbar-title>
      </v-flex>
      <v-flex xs12 sm6 md4 px-3>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('dataTable.SEARCH')"
          single-line
          hide-details
          clearable
          clear-icon="mdi-close"
        ></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3 pl-4 pr-2>
        <v-select
          class="pr-4"
          v-model="categorySelect"
          :items="categories"
          :loading="categoriesLoading"
          :label="$t('beers.SELECT_CATEGORY')"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-data-table
      must-sort
      :loading="dataTableLoading"
      :rows-per-page-text="$t('dataTable.ROWS_PER_PAGE')"
      :no-data-text="$t('dataTable.NO_DATA')"
      :no-results-text="$t('dataTable.NO_RESULTS')"
      :rows-per-page-items="[5, 10, 25]"
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      :total-items="totalItems"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>
          <v-img
            :src="props.item.image_url"
            :lazy-src="
              `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAEbgAABG4B0KOyaAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAErSURBVEiJ7ZdNasMwEIXfSJZtkhIw7SIl9P5H6gGCd3U2tYNkRZqsSiHU8tguGFq/rYb5pBn9PNH7uWWsILUGdFVwJgrShKdSixK2NuAWxrsnAr9WBfZCcGcDzh92OVgRgQiwfRSBiQCjCX5k1aM9ZjDihH3PDFH8OJgBZjk5MiMIyMlSKyKcnuX9BYASCm8vhLpxiIkJJ1d8rPJJ0C/tS41jlSdjBsFGEw470ab/UYddBqNpOrgwy++WVI7BEaLh2UqVyvH/7uoNvIE38J8G/4brnfEs9rfl4FSOQbDzEZ0Ns6GdDXB+2Kcle1w3FpdPn3QSj4rMuLQedZN2miT5wigCylyjMAomIygiaPVt7GJk+MBwPsL2QWT2RBYjMnB1AVc3v/SPWu043QFVoXJ4FBVbTgAAAABJRU5ErkJggg==`
            "
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
        </td>
        <td v-html="props.item.product_name"></td>
        <td>{{ props.item.unique_scans_n }}</td>
        <td>{{ getFormat(props.item.created_t) }}</td>
        <td>{{ getFormat(props.item.last_modified_t) }}</td>
        <td class="fill-height px-0">
          <v-layout class="justify-center">
            <v-tooltip top>
              <v-btn
                icon
                class="mx-0"
                slot="activator"
                @click="viewItem(props.item)"
              >
                <v-icon>visibility</v-icon>
              </v-btn>
              <span>{{ $t('dataTable.VIEW') }}</span>
            </v-tooltip>
          </v-layout>
        </td>
      </template>
      <template v-slot:pageText="props">
        {{ props.pageStart }} - {{ props.pageStop }} {{ $t('dataTable.OF') }}
        {{ props.itemsLength }}
      </template>
      <template v-slot:no-data>{{ $t('dataTable.NO_DATA') }}</template>
      <template v-slot:no-results>{{ $t('dataTable.NO_RESULTS') }}</template>
    </v-data-table>
    <ErrorMessage />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('beers.TITLE')} - %s`
    }
  },
  data() {
    return {
      dataTableLoading: true,
      categoriesLoading: true,
      categorySelect: 'any',
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {
        descending: true,
        rowsPerPage: 10,
        sortBy: 'unique_scans_n'
      },
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: []
    }
  },
  computed: {
    headers() {
      return [
        {
          text: this.$i18n.t('dataTable.PICTURE'),
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text: this.$i18n.t('beers.headers.NAME'),
          align: 'left',
          sortable: true,
          value: 'product_name'
        },
        {
          text: this.$i18n.t('beers.headers.NUMBER_OF_UNIQUE_SCANS'),
          align: 'left',
          sortable: true,
          value: 'unique_scans_n'
        },
        {
          text: this.$i18n.t('common.CREATED'),
          align: 'left',
          sortable: true,
          value: 'created_t'
        },
        {
          text: this.$i18n.t('common.UPDATED'),
          align: 'left',
          sortable: true,
          value: 'last_modified_t'
        },
        {
          text: this.$i18n.t('dataTable.ACTIONS'),
          value: '_id',
          sortable: false,
          width: 100
        }
      ]
    },
    categories() {
      return Array.prototype.concat(this.$store.getters.tabCategories, [
        { text: this.$i18n.t('beers.CATEGORY_ANY'), value: 'any' }
      ])
    },
    items() {
      return this.$store.state.beersBrowser.beers
    },
    totalItems() {
      return this.$store.state.beersBrowser.totalBeers
    }
  },
  watch: {
    dialog(value) {
      return value ? true : this.close()
    },
    pagination: {
      async handler() {
        if (!this.pagination.descending) {
          this.pagination.descending = true
          return
        }
        try {
          this.dataTableLoading = true
          await this.getBeers(
            buildPayloadPagination(
              this.pagination,
              this.buildCategorySearch(),
              this.buildSearch()
            )
          )
          this.dataTableLoading = false
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          this.dataTableLoading = false
        }
      },
      deep: true
    },
    async search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    },
    async categorySelect() {
      this.doSearch()
    }
  },
  mounted() {
    this.doGetCategories()
  },
  methods: {
    ...mapActions(['getCategories', 'getBeers', 'selectBeer']),
    async doGetCategories() {
      try {
        await this.getCategories()
        this.categoriesLoading = false
        this.categories.forEach(obj => {
          if (obj.value === this.selectedCategory) {
            this.categorySelect = obj.value
          }
        })
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.categoriesLoading = false
      }
    },
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date * 1000, 'iii, MMMM d yyyy, h:mm a')
    },

    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getBeers(
          buildPayloadPagination(
            this.pagination,
            this.buildCategorySearch(),
            this.buildSearch()
          )
        )
        this.dataTableLoading = false
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
    buildSearch() {
      return this.search
        ? { query: this.search, fields: this.fieldsToSearch.join(',') }
        : {}
    },
    buildCategorySearch() {
      return this.categorySelect !== 'any' ? this.categorySelect : 'en:beers'
    },
    async viewItem(item) {
      this.selectBeer(item)
      this.$router.push({ name: 'beers-view' })
    }
  },
  props: {
    selectedCategory: {
      type: String,
      default: () => 'any'
    }
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
