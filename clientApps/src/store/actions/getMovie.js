export function nowPopularMovie() {
  return (dispatch, getState) => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=464b6412840269fe91e87ba7d6958784&language=en-US&page=1')
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
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=464b6412840269fe91e87ba7d6958784&language=en-US&page=1')
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
