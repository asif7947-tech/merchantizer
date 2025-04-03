import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { apiRequest, apiRoutes } from '../api/apis';
import axios from 'axios';
import { STORE_REGION_DATA } from '../api/types';

interface SignupScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [selectedRegionId, setSelectedRegionId] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [regionList, setRegionList] = useState<STORE_REGION_DATA[]>([]);


  const getStoreRegions = async () => {
    try {
      const response = await apiRequest(apiRoutes.STORE_REGION, 'post');
      setRegionList(response.data);
      console.log(response.data);
      console.log(response);
      console.log(regionList);
    } catch (error) {
      console.log(error.request);
      console.error('Error fetching store regions:', error);
    }
  };

  const handleSignup = async () => {

    console.log({
      name,
      email,
      phone_no: contactNumber,
      region,
      password,
      confirmPassword,
      qac_id: 8,
    });
    if (!name || !email || !contactNumber || !region || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const myResponse = await apiRequest(apiRoutes.REGISTER_USER, 'post', {
        name,
        email,
        password,
        confrim_password:confirmPassword,
        phone_no: contactNumber,
        region,
        qac_id: selectedRegionId
      })
      console.log(myResponse);
      if (myResponse.status === true) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      }
      // if (myResponse.status === 200) {
      //   Alert.alert('Success', 'Account created successfully!');
      //   navigation.navigate('Login');
      // }
      // if (myResponse.data.status === true) {
      //   Alert.alert('Success', 'Account created successfully!');
      //   navigation.navigate('Login');
      // }
    } catch (error:any) {
      console.log(error.request);
      console.error(error);
      Alert.alert('Error', 'Failed to create account');
      return;
    }
  };

  useEffect(() => {
    getStoreRegions();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image source={storeLogo} style={styles.logo} /> */}
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Contact Number"
          keyboardType="phone-pad"
          value={contactNumber}
          onChangeText={setContactNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Region</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={region}
            onValueChange={(itemValue) => {
              console.log(itemValue);
              setRegion(itemValue)
              const region = regionList.filter((item) => item.name === itemValue)[0];
              console.log(region);
              console.log(region.id);
              setSelectedRegionId(region.id)
            }}
            style={styles.picker}
          >
            {/* {
              // region === '' && <Picker.Item label="Select Region" value="" />
              region? <Picker.Item label={region} value={region} /> : <Picker.Item label="Select Region" value="" />
            } */}

<Picker.Item label="Select Region" value="" />
            
            {
              regionList.map((item) => (
                <Picker.Item  key={item.id} label={item.name} value={item.name} />
              ))
            }
            {/* <Picker.Item label="Region 1" value="region1" />
            <Picker.Item label="Region 2" value="region2" />
            <Picker.Item label="Region 3" value="region3" /> */}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    height: 120,
    width: 120,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F9FAFC',
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  picker: {
    height: 52,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E34234',
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 15,
    fontSize: 14,
    color: '#0A1126',
  },
  loginLink: {
    color: '#E34234',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;