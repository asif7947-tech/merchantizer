import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import SignupScreen from './src/Screens/signUp'
import LoginScreen from './src/Screens/Login';
import StackNavigator from './src/Navigations/stackNavigation';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafc" />
      <StackNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafc',
  },
});

export default App;
