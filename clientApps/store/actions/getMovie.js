import Config from 'react-native-config';

export function nowPopularMovie() {
  return (dispatch, getState) => {
    fetch(`${Config.TMDB_API}/3/movie/popular?api_key=${Config.TMDB_KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'POPULARMOVIE',
          payload: data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function nowUpcomingMovie() {
  return (dispatch, getState) => {
    fetch(`${Config.TMDB_API}/3/movie/upcoming?api_key=${Config.TMDB_KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPCOMINGMOVIE',
          payload: data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
