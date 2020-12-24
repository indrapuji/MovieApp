import Config from 'react-native-config';

export function nowPopularTV() {
  return (dispatch, getState) => {
    fetch(`${Config.TMDB_API}/3/tv/popular?api_key=${Config.TMDB_KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'POPULARTV',
          payload: data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function nowPlayingTV() {
  return (dispatch, getState) => {
    fetch(`${Config.TMDB_API}/3/tv/on_the_air?api_key=${Config.TMDB_KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'PLAYINGTV',
          payload: data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
