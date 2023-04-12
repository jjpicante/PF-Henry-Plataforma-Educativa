import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer';                                                  
import thunkMiddleware from 'redux-thunk';                                        

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;    

const store = createStore(                                                  
    reducer,                                                                       
    composeEnhancer(applyMiddleware(thunkMiddleware))                             
);


export default store;

