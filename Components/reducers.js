const initialState = {
  cuisineData: [],
  selectedItems: [],
  loading: false,
  // ... other state properties
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_CUISINE_DATA":
      return {
        ...state,
        cuisineData: action.payload,
      };
    case "ADD_TO_CART":
      const existingItemIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If the item is already in the cart, update the quantity
        const updatedItems = [...state.selectedItems];
        updatedItems[existingItemIndex].quantity += 1;

        return {
          ...state,
          selectedItems: updatedItems,
        };
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        return {
          ...state,
          selectedItems: [
            ...state.selectedItems,
            { ...action.payload, quantity: 1 },
          ],
        };
      }

    case "REMOVE_FROM_CART":
      const updatedItems = state.selectedItems.map((item) => {
        if (item.id === action.payload.id) {
          // If the item is found, decrement the quantity
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // If the quantity is 1, remove the item from the cart
            return null; // Using null to mark items to be removed
          }
        }
        return item;
      });

      // Filter out items marked for removal (null)
      const filteredItems = updatedItems.filter((item) => item !== null);

      return {
        ...state,
        selectedItems: filteredItems,
      };

    // ... other cases
    default:
      return state;
  }
};

export default appReducer;
