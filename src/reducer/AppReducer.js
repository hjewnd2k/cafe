export default function reducer(state, action) {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, user: action.payload };
    case "GET_ALL_PRODUCTS":
      return { ...state, products: action.payload };
    case "CREATE_ONE_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE_ONE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, ...action.payload }
            : product
        ),
      };
    case "DELETE_ONE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    default:
      break;
  }
}
