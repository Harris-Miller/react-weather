import { ajax } from 'jquery';

export const UPDATING_SEARCH_TEXT = 'UPDATING_SEARCH_TEXT';
export const FOUND_CITIES = 'FOUND_CITIES';
export const SELECT_CITY = 'SELECT_CITY';
export const FOUND_FORECAST = 'FOUND_FORECAST';
export const REMOVE_FORECAST = 'REMOVE_FORECAST';

export const updatingSearchText = textToSearch => ({
  type: UPDATING_SEARCH_TEXT,
  textToSearch
});

export const foundCity = cityResults => {
  return {
    type: FOUND_CITIES,
    cityResults
  };
};

export const selectCity = city => {
  return {
    type: SELECT_CITY,
    zmw: city.zmw
  };
};

export const foundForecasts = forecasts => {
  return {
    type: FOUND_FORECAST,
    forecasts
  };
};

export const searchCity = textToSearch => dispatch => {
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

export const fetchForecast = cities => dispatch => {
  // cities here is a map, if the value has already been set, we just skip it
  const cityPromises = cities.filter(city => !city).mapEntries(([key, value]) => {
    return [key, ajax(`http://api.wunderground.com/api/eb9b4a708505f6e6/forecast/geolookup/forecast/q/zmw:${key}.json`, {
      dataType: 'jsonp',
      //jsonp: 'cb',
      method: 'GET',
      headers: { 'Access-Control-Allow-Origin': '*' }
    })];
  });

  return Promise.all(cityPromises.valueSeq()).then(results => {
    dispatch(foundForecasts(results));
  });
};
