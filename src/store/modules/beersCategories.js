import * as types from '@/store/mutation-types'
import api from '@/services/api/beers'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  categories: state => state.categories,
  totalCategories: state => state.totalCategories
}

const actions = {
  getCategories({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)

      api
        .getBeersCategories()
        .then(response => {
          if (response.status === 200) {
            const data = response.data
            const total = Object.keys(response.data).length
            const categories = []
            for (const tag in data) {
              categories.push({
                text:
                  data[tag].name[rootState.locale.locale] || data[tag].name.en,
                value: tag
              })
            }
            commit(types.CATEGORIES, categories)
            commit(types.TOTAL_CATEGORIES, total)
            buildSuccess(null, commit, resolve)
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.CATEGORIES](state, categories) {
    state.categories = categories
  },
  [types.TOTAL_CATEGORIES](state, value) {
    state.totalCategories = value
  }
}

const state = {
  categories: [],
  totalCategories: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
