import { combineReducers } from 'redux';
import immutable from 'immutable';
import { UPDATING_SEARCH_TEXT, SEARCHING_CITIES, FOUND_CITIES, SEARCHING_FORECAST, FOUND_FORECAST, REMOVE_FORECAST } from '../actions';

const searchByCity = (state = {}, action) => {
  console.log(action.type);
  switch (action.type) {
    case (UPDATING_SEARCH_TEXT):
      return Object.assign({}, state, {
        textToSearch: action.textToSearch
      });
    case (SEARCHING_CITIES):
      return Object.assign({}, state, {
        isFetching: true
      });
    case (FOUND_CITIES):
      return Object.assign({}, state, {
        isFetching: false,
        cityResults: new immutable.List(action.cityResults)
      });
    default:
      return state;
  }
};

const fetchForecast = (state = {}, action) => {
  console.log(action.type);
  switch (action.type) {
    case (SEARCHING_FORECAST):
      return Object.assign({}, state, {
        isFetching: true
      });
    case (FOUND_FORECAST):
      return Object.assign({}, state, {
        forecaseResults: action.forecaseResults
      });
    case (REMOVE_FORECAST):
      // TODO
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  searchByCity
});

export default rootReducer;
