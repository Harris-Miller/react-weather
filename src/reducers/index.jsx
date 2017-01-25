import { combineReducers } from 'redux';
import immutable from 'immutable';
import { UPDATING_SEARCH_TEXT, FOUND_CITIES, ADD_FORECAST, REMOVE_FORECAST, UPDATE_DISPLAY_TEMP } from '../actions';

// first, export this constant state-to-props method that will be used on all "connects"
export const mapStateToProps = state => {
  const { searchByCity, forecast, displayTemp } = state;

  return {
    textToSearch: searchByCity.get('textToSearch'),
    citySearchResults: searchByCity.get('citySearchResults'),
    selectedCities: forecast.get('selectedCities'),
    display: displayTemp.get('display')
  };
};

// now define all the reducers

const searchByCity = (state = new immutable.Map({ textToSearch: '', citySearchResults: new immutable.List() }), action) => {
  switch (action.type) {
    case (UPDATING_SEARCH_TEXT):
      return state.set('textToSearch', action.textToSearch);
    case (FOUND_CITIES):
      return state.set('citySearchResults', new immutable.List(action.citySearchResults));
    default:
      return state;
  }
};

const forecast = (state = new immutable.Map({ selectedCities: new immutable.Map() }), action) => {
  switch (action.type) {
    case (ADD_FORECAST): // eslint-disable-line no-case-declarations
      // that long string interpolaction is to recreate the 'zmw' from the returned data in forecast, as it's not given as it's one property here
      return state.setIn(['selectedCities', `${action.forecast.location.zip}.${action.forecast.location.magic}.${action.forecast.location.wmo}`], action.forecast);
    case (REMOVE_FORECAST):
      return state.deleteIn(['selectedCities', action.zmw]);
    default:
      return state;
  }
};

const displayTemp = (state = new immutable.Map({ display: 'F' }), action) => {
  switch (action.type) {
    case (UPDATE_DISPLAY_TEMP):
      return state.set('display', action.display);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  searchByCity,
  forecast,
  displayTemp
});

export default rootReducer;
