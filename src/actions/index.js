import { ajax } from 'jquery';

export const UPDATING_SEARCH_TEXT = 'UPDATING_SEARCH_TEXT';
export const SEARCHING_CITIES = 'SEARCHING_CITIES';
export const FOUND_CITIES = 'FOUND_CITIES';
export const SELECT_CITY = 'SELECT_CITY';
export const SEARCHING_FORECAST = 'SEARCHING_FORECAST';
export const FOUND_FORECAST = 'FOUND_FORECAST';
export const REMOVE_FORECAST = 'REMOVE_FORECAST';

export const updatingSearchText = textToSearch => ({
  type: UPDATING_SEARCH_TEXT,
  textToSearch
});

export const fetchingCity = textToSearch => ({
  type: SEARCHING_CITIES,
  textToSearch
});

export const foundCity = cityResults => {
  return {
    type: FOUND_CITIES,
    cityResults
  };
};

export const searchingForecast = () => {
  return {
    type: SEARCHING_FORECAST
  };
};

export const foundForecast = forecast => {
  return {
    type: FOUND_FORECAST,
    forecast
  }
};

export const selectCity = city => dispatch => {
  dispatch(searchingForecast());
}

export const searchCity = textToSearch => dispatch => {
  dispatch(fetchingCity());

  // would have liked to use fetch here, but I needed to use jsonp due to CORS, so jquery.ajax it is!
  return ajax(`http://autocomplete.wunderground.com/aq?query=${textToSearch}&c=US`, {
    dataType: 'jsonp',
    jsonp: 'cb',
    method: 'GET',
    headers: { 'Access-Control-Allow-Origin': '*' }
  }).then(cityResults => {
    return dispatch(foundCity(cityResults.RESULTS));
  });
};

export const fetchForecast = city => dispatch => {
  dispatch(searchingForecast());

  return ajax(`http://api.wunderground.com/api/eb9b4a708505f6e6/forecast/geolookup/forecast/q/zmw:${city.zmw}.json`, {
    dataType: 'jsonp',
    jsonp: 'cb',
    method: 'GET',
    headers: { 'Access-Control-Allow-Origin': '*' }
  }).then(forecastResults => {
    return dispatch(foundForecast(forecastResults));
  });
};