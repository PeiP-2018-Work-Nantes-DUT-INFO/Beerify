import axios from 'axios'
export default {
  get3HoursForecast(params) {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.VUE_APP_OPENWEATHER_APIKEY}`,
      {
        params
      }
    )
  }
}
