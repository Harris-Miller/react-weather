import { combineReducers } from 'redux';
import immutable from 'immutable';
import { UPDATING_SEARCH_TEXT, FOUND_CITIES, SELECT_CITY, FOUND_FORECAST, REMOVE_FORECAST } from '../actions';

const searchByCity = (state = new immutable.Map(), action) => {
  switch (action.type) {
    case (UPDATING_SEARCH_TEXT):
      return state.set('textToSearch', action.textToSearch);
    case (FOUND_CITIES):
      return state.set('cityResults', new immutable.List(action.cityResults));
    default:
      return state;
  }
};

const forecast = (state = new immutable.Map({ selectedCities: new immutable.Map() }), action) => {
  switch (action.type) {
    case (SELECT_CITY):
      if (!state.get('selectedCities').has(action.zmw)) {
        return state.setIn(['selectedCities', action.zmw], null);
      }
      return state;
    case (FOUND_FORECAST): // eslint-disable-line no-case-declarations
      // iff forecasts has no length, just return state, nothing changed
      if (!action.forecasts || !action.forecasts.length) {
        return state;
      }

      // make into immutable.map
      const forecasts = new immutable.Map(action.forecasts.map(fc => {
        // may array tuple
        // need to rebuild the zmw from forecast data
        return [`${fc.location.zip}.${fc.location.magic}.${fc.location.wmo}`, fc];
      }));

      // merge with state and return
      return state.set('selectedCities', state.get('selectedCities').merge(forecasts));
    case (REMOVE_FORECAST):
      // TODO
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  searchByCity,
  forecast
});

export default rootReducer;
