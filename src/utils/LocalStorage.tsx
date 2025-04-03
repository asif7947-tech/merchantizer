import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../api/types';

const ASYNC_CONFIG = {
    THEME: "theme",
    USER_DETAILS: "user",
    IS_USER_ALREADY_LOGIN: "isUserAlreadyLogin",
    AUTH_TOKEN: "authToken",
}



export const _saveIsUserAlreadyLoginInAsync = async (value: "yes" | "no") => {
    try {
      await AsyncStorage.setItem(ASYNC_CONFIG.IS_USER_ALREADY_LOGIN, value);
    } catch (error) {
      throw error;
    }
  };
  
  export const _getIsUserAlreadyLoginFromAsync = async (): Promise<string | null> => {
    try {
      let response = await AsyncStorage.getItem(ASYNC_CONFIG.IS_USER_ALREADY_LOGIN);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  export const _saveThemeInAsync = async (value: "light" | "dark") => {
    try {
      await AsyncStorage.setItem(ASYNC_CONFIG.THEME, value);
    } catch (error) {
      throw error;
    }
  };
  
  export const _getThemeFromAsync = async () => {
    try {
      let theme = await AsyncStorage.getItem(ASYNC_CONFIG.THEME);
      return theme;
    } catch (error) {
      throw error;
    }
  };

  export const _saveUserDetailsInAsync = async (value: User) => {
    try {
      await AsyncStorage.setItem(ASYNC_CONFIG.USER_DETAILS, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  };
  
  export const _getUserDetailsFromAsync = async () => {
    try {
      let user = await AsyncStorage.getItem(ASYNC_CONFIG.USER_DETAILS);
      console.log(user);
      if (!user) return null;
      return JSON.parse(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const _saveAuthTokenInAsync = async (value: string) => {
    try {
      await AsyncStorage.setItem(ASYNC_CONFIG.AUTH_TOKEN, value);
    } catch (error) {
      throw error;
    }
  };

  export const _getAuthTokenFromAsync = async () => {
    try {
      let token = await AsyncStorage.getItem(ASYNC_CONFIG.AUTH_TOKEN);
      return token;
    } catch (error) {
      throw error;
    }
  };


