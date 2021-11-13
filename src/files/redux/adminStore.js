let adminStore = {
  barShow: "",
  users: [],
  points: [],
  menu: [],
  pointId: 0,
  orders: [],
  orderContent: []
};

export const adminReducer = (state = adminStore, action) => {
  switch (action.type) {
    case "SET_BAR_SHOW":
      return typeof action.payload !== "object"
        ? { ...state, barShow: action.payload }
        : {
            ...state,
            barShow: action.payload.show,
            pointId: action.payload.pointId,
            menu: state.pointId === action.payload.pointId ? state.menu : [],
          };
    case "LOAD_ALL_USERS":
      return { ...state, users: action.payload };
    case "LOAD_ALL_POINTS":
      return { ...state, points: action.payload };
    case "LOAD_ALL_MENU":
      return action.payload.length === 0
        ? { ...state, menu: [{ name: "Ничего нет" }] }
        : { ...state, menu: action.payload };
    case "LOAD_ALL_ORDERS":
      return { ...state, orders: action.payload };
    case "SHOW_ORDER_CONTENT":
      return { ...state, barShow: "orderContent", orderContent: action.payload}
    default:
      return state;
  }
};
