import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
  removeUser: "user/remove-user" // New endpoint for removing user
};

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.signin,
        { username, password }
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  signup: async ({ username, password, confirmPassword, displayName, email, phoneNo }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.signup,
        { username, password, confirmPassword, displayName, email, phoneNo }
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(
        userEndpoints.passwordUpdate,
        { password, newPassword, confirmNewPassword }
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  // New removeUser method
  removeUser: async () => {
    try {
      const response = await privateClient.delete(userEndpoints.removeUser);

      return { response };
    } catch (err) {
      return { err };
    }
  }
};

export default userApi;
