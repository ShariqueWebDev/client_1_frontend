export const registerUser = async (formData) => {
  console.log(NEXT_PUBLIC_SERVER);

  const res = await fetch(`${"http://localhost:4000"}/api/v1/auth/signup`, {
    method: "POST",
    credentials: "include", // cookie set hogi
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token; // authSlice me jo token store hai
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${"http://localhost:4000"}/api/v1/auth/login`, {
    method: "POST",
    credentials: "include", // important (cookie store hogi browser me)
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
};
