import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image,ScrollView, Dimensions, Platform } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StoreIcon from '../assets/storeicons.png';
import CameraIcon from '../assets/cameras.png';
import greenStore from '../assets/greenstore.png';
import redStore from '../assets/redStore.png';
import orangeStore from '../assets/orangeStore.png';
import StoreIcon1 from '../assets/storeIcons1.png'
import StoreIcon2 from '../assets/storeIcons2.png'
import homeIcon1 from '../assets/homeIcon.png'
import logoutIcon from '../assets/logout.png'
import { _getUserDetailsFromAsync } from '../utils/LocalStorage';
import { apiRequest, apiRoutes } from '../api/apis';
const { height } = Dimensions.get('window');
import { STORE_COUNT_DATA } from '../api/types';


const HomeScreen = () => {
  const navigation = useNavigation();

  const [marchentName, setMarchentName] = useState('Muhammad Usman');
  const [currentDate, setCurrentDate] = useState('');
  const [storeCountData , setStoreCountData] = useState(null);
  const [storeData, setStoreData] = useState(null);

  
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigateToSuccessfulStores = () => {
    navigation.navigate('StoreListScreen',{
      storeType: 'successful'
    });
  };
  const navigateToNcStores = () => {
    // navigation.navigate('NcStoreListScreen');
    navigation.navigate('StoreListScreen',{
      storeType: 'nc'
    });
  };
  const navigateToExistingStores = () => {
    // navigation.navigate('ExistingStoreListScreen');
    navigation.navigate('StoreListScreen',{
      storeType: 'existing'
    });
  };
  const navigateToRejectedStores = () => {
    // navigation.navigate('RejectedStoreListScreen');

    navigation.navigate('StoreListScreen',{
      storeType: 'rejected'
    });
  };
  const navigateTonewStores = () => {
    // navigation.navigate('NewStoreListScreen');
    navigation.navigate('StoreListScreen',{
      storeType: 'new'
    });
  };
  const navigateTooutOfStockStores = () => {
    // navigation.navigate('OutOfStockListScreen');
    navigation.navigate('StoreListScreen',{
      storeType: 'out/stock'
    });
  };
  const navigateToStores = () => {
    navigation.navigate('HomeScreen');
  };
  const navigateToHome = () => {
    navigation.navigate('HomePage');
  };
  const navigateToLogout = () => {
    navigation.navigate('Login');
  };
  const [storesData, setStoresData] = useState({
    successfulStores: storeCountData?.successStore,
    ncStores: storeCountData?.ncStore,
    existingStores: storeCountData?.existingStore,
    rejectedByQCStores: storeCountData?.rejectedStore,
    newStores: storeCountData?.newStore,
    outOfStocks: storeCountData?.outStockStore,
  });

  const getStoreDtails = async() => {
    try{

      const response = await apiRequest(apiRoutes.GET_STORE_COUNT,'get')
      console.log(response)
      setStoreCountData(response.data)
      setStoresData({
        successfulStores: response.data.successStore,
        ncStores: response.data.ncStore,
        existingStores: response.data.existingStore,
        rejectedByQCStores: response.data.rejectedStore,
        newStores: response.data.newStore,
        outOfStocks: response.data.outStockStore,
      })

    } catch(error){
      console.log(error)
    }
  }


  useEffect(() => {

    _getUserDetailsFromAsync().then((user) => {
      setMarchentName(user.name);
    })
    
    const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            weekday: 'long',  // Monday
            day: '2-digit',   // 11
            month: 'long',    // January
            year: 'numeric'   // 2025
        });

        setCurrentDate(formattedDate);
        getStoreDtails();
  },[]);

  return (
    <View style={styles.mainContainer}>
    <ScrollView style={styles.scrollContainer}>
      <View  style={styles.container}>
      <View style={styles.summarycontainer}>
        <Text style={styles.title}>{marchentName}</Text>
        <Text style={styles.date}>{currentDate}</Text>
        <View style={styles.tasks__container}>
          <View style={styles.tasks__container_2}>
          <Text style={styles.storeNumber}>{storeCountData?.successStore}</Text>
          <Text style={styles.storetitle}>Successful{'\n'}Stores</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.tasks__container_2}>
          <Text style={styles.storeNumber}>{storeCountData?.rejectedStore}</Text>
          <Text style={styles.storetitle}>Rejected {'\n'}Stores</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.tasks__container_2}>
          <Text style={styles.storeNumber}>{storeCountData?.ncStore}</Text>
          <Text style={styles.storetitle}>Nc {'\n'}Stores</Text>
          </View>
          
        </View>
        
      </View>
      
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.box, styles.successfulStores]}
          onPress={navigateToSuccessfulStores} // Navigate on press
        >
           <Image source={StoreIcon1} style={styles.storeIcon} />
          <Text style={styles.boxTitle}>Successful Stores</Text>

          <Text style={styles.boxValue}>{storesData.successfulStores}</Text>
          {/* <Image source={StoreIcon} style={styles.storeIcon} /> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToNcStores}
          style={[styles.box, styles.ncStores]}>
              <Image source={StoreIcon1} style={styles.storeIcon} />
          <Text style={styles.boxTitle}>NC  {'\n'}Stores</Text>
          <Text style={styles.boxValue}>{storesData.ncStores}</Text>
          {/* <Image source={StoreIcon} style={styles.storeIcon} /> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToExistingStores}
          style={[styles.box, styles.existingStores]}>
              <Image source={StoreIcon1} style={styles.storeIcon} />
          <Text style={styles.boxTitle}>Existing Stores</Text>
          <Text style={styles.boxValue}>{storesData.existingStores}</Text>
          {/* <Image source={CameraIcon} style={styles.storeIcon} /> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToRejectedStores}
          style={[styles.box, styles.rejectedByQC]}>
              <Image source={StoreIcon1} style={styles.storeIcon} />
          <Text style={styles.boxTitle}>Rejected by QC Stores</Text>
          <Text style={styles.boxValue}>{storesData.rejectedByQCStores}</Text>
          {/* <Image source={greenStore} style={styles.storeIcon} /> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateTonewStores}

          style={[styles.box, styles.newStores]}>
              <Image source={StoreIcon1} style={styles.storeIcon} />
          <Text style={styles.boxTitle}>New Stores</Text>
          <Text style={styles.boxValue}>{storesData.newStores}</Text>
          {/* <Image source={redStore} style={styles.storeIcon} /> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateTooutOfStockStores}
          style={[styles.box, styles.outOfStocks]}>
              <Image source={StoreIcon1} style={styles.storeIcon} />
          <Text style={styles.boxTitle}>Out of Stocks</Text>
          <Text style={styles.boxValue}>{storesData.outOfStocks}</Text>
          {/* <Image source={orangeStore} style={styles.storeIcon} /> */}
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {/* Home Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToHome()}
          onPressIn={() => setHoveredButton('home')}
          onPressOut={() => setHoveredButton(null)}
        >
        <Image source={homeIcon1} style={styles.storeIcon} />
        <Text
            style={[
              styles.buttonText,
              hoveredButton === 'home' && styles.hoveredText,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Stores Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToStores()}
          onPressIn={() => setHoveredButton('stores')}
          onPressOut={() => setHoveredButton(null)}
        >
        <Image source={StoreIcon2} style={styles.storeIcon} />
        <Text
            style={[
              styles.buttonText,
              hoveredButton === 'stores' && styles.hoveredText,
            ]}
          >
            Stores
          </Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToLogout()}
          onPressIn={() => setHoveredButton('logout')}
          onPressOut={() => setHoveredButton(null)}
        >
        <Image source={logoutIcon} style={styles.storeIcon} />
        <Text
            style={[
              styles.buttonText,
              hoveredButton === 'logout' && styles.hoveredText,
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginBottom: 50,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  container: {
    flexDirection: 'column',
    marginBottom:60,
  },
  summarycontainer: {
    backgroundColor: '#E34234',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft:20,
    paddingTop:20,
    paddingRight:20,
    paddingBottom:70,
    flexDirection: 'column',
    gap: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Poppins',
  },

  date: {
    fontSize: 13,
    color: 'yellow',
    fontFamily: 'Poppins',
  },
  tasks__container: {
    flexDirection:'row',
  gap:25,
    marginTop:15
  },
  tasks__container_2: {
    flexDirection: 'column',
    gap: 0,
  },
  storeNumber:
  {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Poppins',
  },
  storetitle:
  {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Poppins',
  },
  separator: {
    width: 0.4,
    height: '70%',
    backgroundColor: 'yellow',
    marginHorizontal: 0,
    marginTop:18
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 300,
    position:'absolute',
    top:'79%',
    paddingLeft:10,
    paddingRight:10,
    gap:0,
  },
  box: {
    width: '48%',

    marginBottom: 20,
    borderRadius: 16,
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, 
    gap:5
  
  },
  boxTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'Poppins',
    marginTop:10
  },
  boxValue: {
    color: '#000',
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'Poppins',
    marginRight: 62,

  },
  button: {
    backgroundColor: '#0A1126',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  storeIcon: {
  height:30,
  width:30
  },
  successfulStores: {
    backgroundColor: '#FFFFFF', // Green
  },
  ncStores: {
    backgroundColor: '#FFFFFF', // Blue
  },
  existingStores: {
    backgroundColor: '#FFFFFF', // Yellow
   
  },
  rejectedByQC: {
    backgroundColor: '#FFFFFF',
  
  },
  newStores: {
    backgroundColor: '#FFFFFF',
  
  },
  outOfStocks: {
    backgroundColor: '#FFFFFF', // Teal
    marginBottom: 50,
   
  },
  buttonContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    position: 'absolute',
    top: Platform.select({
      ios: height * 0.9,
      android: height * 0.9, 
    }),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
    marginTop: 5,
  },
  hoveredText: {
    color:  '#E34234',
  },
  storeIcon:
  {
  height:30,
  width:30
  }

});

export default HomeScreen;
