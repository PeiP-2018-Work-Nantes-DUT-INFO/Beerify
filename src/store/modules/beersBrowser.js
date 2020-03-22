import * as types from '@/store/mutation-types'
import api from '@/services/api/beers'
import { handleError } from '@/utils/utils.js'

const getters = {
  beers: state => state.beers,
  totalBeers: state => state.totalBeers
}

const actions = {
  getBeers({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      api
        .search(payload)
        .then(response => {
          if (response.status === 200) {
            const products = response.data.products.map(product => {
              // eslint-disable-next-line camelcase
              const product_name =
                product[`product_name_${rootState.locale.locale}`] ||
                product.product_name_en ||
                product.product_name ||
                product._id
              return {
                ...product,
                // eslint-disable-next-line camelcase
                product_name: product.brands
                  ? // eslint-disable-next-line camelcase
                    `${product.brands} - ${product_name}`
                  : // eslint-disable-next-line camelcase
                    product_name,
                // eslint-disable-next-line camelcase
                unique_scans_n: product.unique_scans_n || 0
              }
            })
            commit(types.BEERS, products)
            commit(types.TOTAL_BEERS, response.data.count)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  selectBeer({ commit }, payload) {
    commit(types.SELECT_BEER, payload)
  }
}

const mutations = {
  [types.BEERS](state, beers) {
    state.beers = beers
  },
  [types.SELECT_BEER](state, beer) {
    state.selectedBeer = beer
  },
  [types.TOTAL_BEERS](state, value) {
    state.totalBeers = value
  }
}

const state = {
  beers: [],
  selectedBeer: null,
  totalBeers: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
