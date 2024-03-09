// auth.js

import apiManager from "../apiManager";

export async function signIn(email, password) {
  try {
    const response = await apiManager.post("login", { email, password });
    const token = response.data.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
}
