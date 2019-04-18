import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from 'src/store/reducers';
import ajaxMiddleware from './ajaxMiddleware';
import backOfficeMiddleware from './backOfficeMiddleware';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);

const appliedMiddlewares = applyMiddleware(ajaxMiddleware, backOfficeMiddleware);

const devTools = [
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
];

const enhancers = compose(appliedMiddlewares, ...devTools);

export const store = createStore(pReducer, enhancers);
export const persistor = persistStore(store);
