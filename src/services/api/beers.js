import axios from 'axios'

export default {
  search(params) {
    return axios.get('/cgi/search.pl?action=process&json=1', {
      params
    })
  },

  getBeersCategories() {
    // eslint-disable-next-line no-unused-vars
    return axios.get('/data/taxonomies/categories.json')
  }
}
