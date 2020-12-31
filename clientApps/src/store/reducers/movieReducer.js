const initialState = {
  popularmovie: [],
  upcomingmovie: [],
};

function movieReducer(state = initialState, action) {
  if (action.type === "POPULARMOVIE") {
    return { ...state, popularmovie: action.payload };
  } else if (action.type === "UPCOMINGMOVIE") {
    return { ...state, upcomingmovie: action.payload };
  }
  return state;
}

export default movieReducer;
