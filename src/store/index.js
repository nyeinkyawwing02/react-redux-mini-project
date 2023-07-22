import { reducers } from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const configureStore = (preState) => {
  const store = createStore(reducers(), preState, composedEnhancer);

  return {
    store,
  };
};

export default configureStore;
