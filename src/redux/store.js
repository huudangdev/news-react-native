import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './rootReducer'

const enhancer = compose(applyMiddleware(thunk))

export default createStore(reducers, enhancer)
