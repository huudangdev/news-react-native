import * as c from './constants'

const initialState = {
  business: { articles: [] },
  entertainment: { articles: [] },
  general: { articles: [] },
  health: { articles: [] },
  science: { articles: [] },
  sports: { articles: [] },
  technology: { articles: [] }
}

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.HEADLINES_AVAILABLE: {
      const { business, entertainment, general, health, science, sports, technology } = action.headlines

      return { ...state, business, entertainment, general, health, science, sports, technology }
    }

    case c.CATEGORY_HEADLINES_AVAILABLE: {
      const { category, headlines, page } = action
      const { articles } = headlines

      if (page > 1) {
        // clone the current state
        const data = state[category.toLowerCase()]
        const clone = JSON.parse(JSON.stringify(data))
        const articles_ = clone.articles

        clone.articles = [...articles_, ...articles]

        return { ...state, [category.toLowerCase()]: clone }
      } else {
        return { ...state, [category.toLowerCase()]: headlines }
      }
    }

    default:
      return state
  }
}

export default newsReducer
