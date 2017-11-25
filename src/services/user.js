import client from './client';

class UserApi {
  loginUser(credentials) {
    return client.post(`auth/sign_in`, credentials)
  };

  signUpUser(credentials) {
    return client.post(`auth`, credentials)
  };

  logoutUser(uid) {
    return client.delete(`auth`)
  };
}

export default new UserApi();
