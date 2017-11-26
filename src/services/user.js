import client from './client';

class UserApi {
  loginUser(credentials) {
    return client.post(`auth/sign_in`, credentials)
  };

  signUpUser(credentials) {
    return client.post(`auth`, credentials)
  };

  logoutUser() {
    return client.delete(`auth/sign_out`)
  };

  verifyToken() {
    return client.get('auth/validate_token')
  }
}

export default new UserApi();
