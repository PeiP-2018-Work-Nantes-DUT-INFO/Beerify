import i18n from '@/plugins/i18n'
import * as types from '@/store/mutation-types'
import { format } from 'date-fns'
import { es, zhCN, de, fr } from 'date-fns/locale'

const localesDateFns = {
  es,
  cn: zhCN,
  de,
  fr
}

export const getFormat = (date, formatStr) => {
  return format(date, formatStr, {
    locale: localesDateFns[window.__localeId__]
  })
}

export const formatErrorMessages = (translationParent, msg) => {
  const errorArray = []
  // Check for error msgs
  if (msg !== null) {
    const json = JSON.parse(JSON.stringify(msg))
    // If error message is an array, then we have mutiple errors
    if (Array.isArray(json)) {
      json.map(error => {
        errorArray.push(i18n.t(`${translationParent}.${error.msg}`))
      })
    } else {
      // Single error
      errorArray.push(i18n.t(`${translationParent}.${msg}`))
    }
    return errorArray
  }
  // all good, return null
  return null
}

export const buildPayloadPagination = (pagination, category, search) => {
  const { sortBy, page, rowsPerPage } = pagination
  // let { descending } = pagination
  // Gets order
  // descending = descending ? -1 : 1

  let query = {}

  // If search and fields are defined
  if (search) {
    query = {
      // eslint-disable-next-line camelcase
      sort_by: sortBy,
      // order: descending,
      page,
      // eslint-disable-next-line camelcase
      page_size: rowsPerPage,
      // eslint-disable-next-line camelcase
      search_terms2: search.query
    }
  } else {
    // Pagination with no filters
    query = {
      // eslint-disable-next-line camelcase
      sort_by: sortBy,
      // order: descending,
      page,
      // eslint-disable-next-line camelcase
      page_size: rowsPerPage
    }
  }
  if (category) {
    query = {
      ...query,
      // eslint-disable-next-line camelcase
      tagtype_0: 'categories',
      // eslint-disable-next-line camelcase
      tag_contains_0: 'contains',
      // eslint-disable-next-line camelcase
      tag_0: category
    }
  }
  return query
}

// Catches error connection or any other error (checks if error.response exists)
export const handleError = (error, commit, reject) => {
  let errMsg = ''
  // Resets errors in store
  commit(types.SHOW_LOADING, false)
  commit(types.ERROR, null)

  // Any other error
  errMsg = error.response
    ? error.response.data.message
    : 'SERVER_TIMEOUT_CONNECTION_ERROR'
  setTimeout(() => {
    return errMsg
      ? commit(types.ERROR, errMsg)
      : commit(types.SHOW_ERROR, false)
  }, 0)
  reject(error)
}

export const buildSuccess = (
  msg,
  commit,
  resolve,
  resolveParam = undefined
) => {
  commit(types.SHOW_LOADING, false)
  commit(types.SUCCESS, null)
  setTimeout(() => {
    return msg ? commit(types.SUCCESS, msg) : commit(types.SHOW_SUCCESS, false)
  }, 0)
  commit(types.ERROR, null)
  resolve(resolveParam)
}
