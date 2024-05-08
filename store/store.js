import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/rootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'

const  persistConfig = {
    key: 'root-persist',
    storage
}


const persistedReducer  = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export const persistor = persistStore(store)

export default store