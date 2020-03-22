import axios from 'axios'

export default {
  getLocationsByCities(query) {
    return axios.get(
      `https://beermapping.com/webservice/loccity/${process.env.VUE_APP_BEERMAPPINGPROJECT_APIKEY}/${query}&s=json`
    )
  }
}
