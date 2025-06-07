const notify = (state = "", action) => {
  switch (action.type) {
    case "SHOW_NOTIFY":
      return action.payload;
    case "HIDE_NOTIFY":
      return "";
    default:
      return state;
  }
};

export default notify;
