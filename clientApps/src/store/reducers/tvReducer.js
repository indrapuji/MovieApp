const initialState = {
  popularTV: [],
  playingTV: [],
};

function tvReducer(state = initialState, action) {
  if (action.type === "POPULARTV") {
    return { ...state, popularTV: action.payload };
  } else if (action.type === "PLAYINGTV") {
    return { ...state, playingTV: action.payload };
  }
  return state;
}

export default tvReducer;

