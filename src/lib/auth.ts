import { deleteAccessTokenCookie } from "./utils";

export const logout = () => {
  deleteAccessTokenCookie();
  window.location.reload();
};
