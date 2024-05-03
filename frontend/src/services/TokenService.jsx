import instance from "../api/http";

// RefreshToken
export const RefreshToken = (data) => {
  return instance.post("/auth/refreshtoken", data);
};
