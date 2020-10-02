export const initialState = {
  user: null,
  playlists: [],
  play: false,
  item: null
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case 'SET USER':
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default reducer;
