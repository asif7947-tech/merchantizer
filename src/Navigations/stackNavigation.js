// navigation/StackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../Screens/Login';
import SignupScreen from '../Screens/SignUp';  
import HomeScreen from '../Screens/homePage';
import SuccessfulStoreScreen from '../Screens/successfullStoreForm';
import ncStoreScreen from '../Screens/ncStoresForm';
import ExistingStoreScreen from '../Screens/existingStoreForm';
import RejectedStoreScreen from '../Screens/rejectedStoreForm';
import newStoreScreen from '../Screens/newStoreForm';
import OutOfStockScreen from '../Screens/outofStock';
import StoreListScreen from '../Screens/storeList';
import NcStoreScreen from '../Screens/ncStoreList';
import ExistingStoreListScreen from '../Screens/existingStoreList';
import RejectedStoreListScreen from '../Screens/rejectedStoreList';
import NewStoreListScreen from '../Screens/newStoresList';
import OutOfStockListScreen from '../Screens/outOfStockList';
import SplashScreen from '../Screens/splashScreen';
import HomeScreens from '../Screens/HomeScreen';
const Stack = createStackNavigator();

export const screenRoutes = { 
  Login: 'Login',
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Splash Screen */}
        <Stack.Screen 
          name="SplashScreen" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
          <Stack.Screen 
          name="HomePage" 
          component={HomeScreens} 
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="SuccessfullStoreFormScreen" 
          component={SuccessfulStoreScreen} 
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="ncStoreFormScreen" 
          component={ncStoreScreen} 
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="existingStoreFormScreen" 
          component={ExistingStoreScreen} 
          options={{ headerShown: false }}
        />
          <Stack.Screen 
          name="rejectedStoreFormScreen" 
          component={RejectedStoreScreen} 
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="newStoreFormScreen" 
          component={newStoreScreen} 
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="outOFStockFormScreen" 
          component={OutOfStockScreen} 
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="StoreListScreen" 
          component={StoreListScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="NcStoreListScreen" 
          component={NcStoreScreen} 
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="ExistingStoreListScreen" 
          component={ExistingStoreListScreen} 
          options={{ headerShown: false }}
        />
          <Stack.Screen 
          name="RejectedStoreListScreen" 
          component={RejectedStoreListScreen} 
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="NewStoreListScreen" 
          component={NewStoreListScreen} 
          options={{ headerShown: false }}
        />
          <Stack.Screen 
          name="OutOfStockListScreen" 
          component={OutOfStockListScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
