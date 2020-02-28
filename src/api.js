import axios from 'axios'

import * as c from './constants'

export async function getHeadlines (country = 'us') {
  try {
    const requests = []
    c.CATEGORIES.map((category) => {
      const url = `${c.HEADLINES}&country=${country}&category=${category.toLowerCase()}`
      requests.push(axios.get(url))
    })

    const response = await Promise.all(requests)
    response.map((resp, idx) => {
      const { articles, totalResults } = resp.data

      response[idx] = { articles, totalResults }
    })

    const [business, entertainment, general, health, science, sports, technology] = response

    return { business, entertainment, general, health, science, sports, technology }
  } catch (e) {
    throw new Error(e)
  }
}

export async function getHeadlinesByCategory (category, page = 1, country = 'us') {
  try {
    const url = `${c.HEADLINES}&category=${category}&page=${page}&country=${country}`
    const res = await axios.get(url)

    return res.data
  } catch (e) {
    throw new Error(e)
  }
}

export async function search (query, cancelToken) {
  try {
    const url = `${c.SEARCH}&q=${query.toLowerCase()}`
    const res = await axios.get(url, {
      cancelToken: cancelToken.token
    })

    return res.data
  } catch (error) {
    const err = new Error(error.message)
    err.isCancel = (axios.isCancel(error))

    throw err
  }
}
