import { ajax } from 'jquery';

export const UPDATING_SEARCH_TEXT = 'UPDATING_SEARCH_TEXT';
export const FOUND_CITIES = 'FOUND_CITIES';
export const ADD_FORECAST = 'ADD_FORECAST';
export const REMOVE_FORECAST = 'REMOVE_FORECAST';
export const UPDATE_DISPLAY_TEMP = 'UPDATE_DISPLAY_TEMP';

export const updatingSearchText = textToSearch => ({
  type: UPDATING_SEARCH_TEXT,
  textToSearch
});

export const foundCity = citySearchResults => {
  return {
    type: FOUND_CITIES,
    citySearchResults
  };
};

export const removeForecast = zmw => {
  return {
    type: REMOVE_FORECAST,
    zmw
  };
};

export const addForecast = forecast => {
  return {
    type: ADD_FORECAST,
    forecast
  };
};

export const updateTempDisplay = display => {
  return {
    type: UPDATE_DISPLAY_TEMP,
    display
  };
};

export const searchCity = textToSearch => dispatch => {
  // would have liked to use fetch here, but I needed to use jsonp due to CORS, so jquery.ajax it is!
  return ajax(`http://autocomplete.wunderground.com/aq?query=${textToSearch}&c=US`, {
    dataType: 'jsonp',
    jsonp: 'cb',
    method: 'GET',
    headers: { 'Access-Control-Allow-Origin': '*' }
  }).then(cityResults => dispatch(foundCity(cityResults.RESULTS)));
};

export const fetchForecast = zmw => dispatch => {
  return ajax(`http://api.wunderground.com/api/eb9b4a708505f6e6/conditions/forecast/geolookup/hourly/q/zmw:${zmw}.json`, {
    dataType: 'jsonp',
    //jsonp: 'cb',
    method: 'GET',
    headers: { 'Access-Control-Allow-Origin': '*' }
  }).then(forecast => dispatch(addForecast(forecast)));
};
