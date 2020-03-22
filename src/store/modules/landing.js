import * as types from '@/store/mutation-types'
import api from '@/services/api/weather'
import apiLocations from '@/services/api/beerLocations'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  pubs: state => state.pubs,
  get5Pubs: state =>
    state.pubs.sort((a, b) => b.overall - a.overall).slice(0, 5),
  totalPubs: state => state.totalPubs,
  city: state => state.city,
  forecasts: state => state.forecasts,
  currentForecast: state => state.forecasts[0],
  next3DaysForecast(state, moduleGetters) {
    if (!state.forecasts) {
      return []
    }
    const currentDateForecast = new Date(
      moduleGetters.currentForecast.dt * 1000
    )
    const forecasts3days = []
    let prevDay = currentDateForecast.getDay()
    state.forecasts.forEach(forecast => {
      const forecastDate = new Date(forecast.dt * 1000)
      if (prevDay !== forecastDate.getDay() && forecasts3days.length < 3) {
        prevDay = forecastDate.getDay()
        forecasts3days.push(forecast)
      }
    })
    return forecasts3days
  }
}

const actions = {
  get3HoursForecastAndBars({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .get3HoursForecast(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.FORECASTS, response.data.list)
            commit(types.CITY, response.data.city)
            return apiLocations.getLocationsByCities(payload.q)
          }

          return Promise.reject(response)
        })
        .then(response => {
          if (response.status === 200) {
            const locations = response.data.filter(loc => !!loc.id)
            commit(types.PUBS, locations)
            commit(types.TOTAL_PUBS, locations.length)
            buildSuccess(null, commit, resolve)
            return Promise.resolve()
          }
          return Promise.reject(response)
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.PUBS](state, pubs) {
    state.pubs = pubs
  },
  [types.TOTAL_PUBS](state, value) {
    state.totalPubs = value
  },
  [types.CITY](state, value) {
    state.city = value
  },
  [types.FORECASTS](state, forecasts) {
    state.forecasts = forecasts
  }
}

const state = {
  pubs: [],
  totalPubs: 0,
  city: {},
  forecasts: null
}

export default {
  state,
  getters,
  actions,
  mutations
}
