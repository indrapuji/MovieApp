export function nowPopularTV() {
  return (dispatch, getState) => {
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=464b6412840269fe91e87ba7d6958784&language=en-US&page=1')
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
    fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=464b6412840269fe91e87ba7d6958784&language=en-US&page=1')
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
