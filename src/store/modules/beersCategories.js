import * as types from '@/store/mutation-types'
import api from '@/services/api/beers'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  categories: state => state.categories,
  tabCategories: (state, moduleGetters, rootState) => {
    const categories = []
    for (const tag in state.categories) {
      categories.push({
        text:
          state.categories[tag].name[rootState.locale.locale] ||
          state.categories[tag].name.en,
        value: tag
      })
    }
    return categories
  },
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
            const data = Object.keys(response.data)
              .filter(
                key =>
                  response.data[key].parents &&
                  response.data[key].parents.indexOf('en:beers') > -1
              )
              .reduce(
                (res, key) => Object.assign(res, { [key]: response.data[key] }),
                {}
              )
            const total = Object.keys(data).length
            commit(types.CATEGORIES, data)
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
