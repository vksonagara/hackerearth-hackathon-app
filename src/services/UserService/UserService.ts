import Toast from 'react-native-toast-message';

import { store } from '@store';
import { login, logout } from '@store/auth';
import {
  fetcher,
  setAsyncStorage,
  removeAsyncStorage,
  getAsyncStorage,
} from '@utils';
import config from '@config';

export default class UserService {
  public static async RegisterOrLogin(email: string): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.USER}/api/users/register-or-login`,
      method: 'POST',
      body: { email },
    });
  }

  public static async VerifyOtp(userId: string, otp: string): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.USER}/api/users/verify-otp`,
      method: 'POST',
      body: { userId, otp },
    });
  }

  public static async UpdateProfile(name: string): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.USER}/api/users/profile`,
      method: 'PUT',
      body: { name },
    });
  }

  public static async GetProfile(): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.USER}/api/users/profile`,
      method: 'GET',
    });
  }

  public static async login(token?: string): Promise<any> {
    if (token) {
      const setted = await setAsyncStorage('token', token);
      if (setted) {
        store.dispatch(login(token));
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong :(',
        });
      }
    } else {
      const accessToken = await getAsyncStorage('token');
      if (accessToken) {
        store.dispatch(login(accessToken));
      }
    }
  }

  public static async logout(): Promise<any> {
    const removed = await removeAsyncStorage('token');
    if (removed) {
      store.dispatch(logout());
    }
  }
}
