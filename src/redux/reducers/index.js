import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import Auth from './Auth';
import Common from './Common';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
  });
