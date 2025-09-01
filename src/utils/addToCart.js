// utils/guestCart.js
export const getGuestCart = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("guestCart");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const setGuestCart = (items) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("guestCart", JSON.stringify(items));
  }
};

export const clearGuestCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("guestCart");
  }
};
