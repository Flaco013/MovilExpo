// actions.js
export const addToCart = (item) => ({
  type: "ADD_TO_CART",
  payload: { ...item, quantity: 1, id: item.id }, // Include a unique identifier
});

export const removeFromCart = (item) => ({
  type: "REMOVE_FROM_CART",
  payload: item,
});

export const setUserProfile = (profile) => ({
  type: "SET_USER_PROFILE",
  payload: profile,
});
