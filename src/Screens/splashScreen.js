import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import logo from '../assets/splashlogo1.jpeg'
import calpolIcon from '../assets/calpol.png'; 
import { setAuthToken } from '../api/index';
import { _getAuthTokenFromAsync, _getIsUserAlreadyLoginFromAsync, _getUserDetailsFromAsync } from '../utils/LocalStorage';


const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      _getIsUserAlreadyLoginFromAsync().then((response) => {
        console.log(response);
        if (response === 'yes') {
          _getAuthTokenFromAsync().then((token) => {
            console.log(token);
            setAuthToken(token);
            _getUserDetailsFromAsync().then((user) => {
              console.log(user);
              navigation.navigate('HomePage', { user });
            });
          }).catch((error) => {
            console.log(error);
          });
        } else {
          navigation.navigate('Login');
        }
      });
      // navigation.replace('Login');
    }, 5000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
     <Image source={logo} style={styles.splashLogo} />
      <Image source={calpolIcon} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    alignItems: 'center',
    justifyContent: 'center',
    gap: 100,
  },
  splashLogo:
  {
    width: 320,
    height: 320,
    resizeMode: 'contain',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop:50
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,         
    borderColor: '#000',     
    shadowColor: '#654EA3',  
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,      
    shadowRadius: 5,         
    elevation: 6,            
  },
  
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SplashScreen;
