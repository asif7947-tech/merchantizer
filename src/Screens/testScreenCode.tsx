import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import storeIcon from '../assets/storeIcons2.png';
import CameraIcon from '../assets/camaraIcon.png';
import profileIcon from '../assets/store.jpeg';
import homeIcon1 from '../assets/homeIcon.png'
import logoutIcon from '../assets/logout.png'
import SearchIcon from '../assets/searchIcon.png';

interface Store {
  id: string;
  name: string;
  address: string;
}

interface Tab {
  label: string;
  route: string;
}

interface RejectionReason {
  reason: string;
}

interface User {
  name: string;
  email: string;
  region: string;
}

interface ExistingStoresScreenProps {
  navigation: any;
  route: {
    params: {
      user: User;
    };
  };
}

const storeData: Store[] = [
  { id: '1', name: 'Punjab Pharmacy', address: '6th road Rawalpindi' },
  { id: '2', name: 'Shaheen Chemists', address: 'Saddar Rawalpindi' },
  { id: '3', name: 'D-Watson', address: 'Blue Area Islamabad' },
  { id: '4', name: 'Ak-karim Pharmacy', address: 'Gulberg Greens Islamabad' },
  { id: '5', name: 'Punjab Pharmacy', address: '6th road Rawalpindi' },
];

const rejectionReasons: string[] = [
  'Owner Not available',
  'Stock Not available',
  'Permanently closed',
  'Temporary closed',
  'Out of city',
  'Address not found',
  'Custom Reason',
];

const tabs: Tab[] = [
  { label: 'Existing Stores', route: 'ExistingStoreListScreen' },
  { label: 'NC Stores', route: 'NcStoreListScreen' },
  { label: 'New Stores', route: 'NewStoreListScreen' },
  { label: 'Successful Stores', route: 'StoreListScreen' },
  { label: 'Rejected Stores', route: 'RejectedStoreListScreen' },
  { label: 'Out Of Stocks', route: 'OutOfStockListScreen' },
];

const TestExistingStoresScreen: React.FC<ExistingStoresScreenProps> = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredStores, setFilteredStores] = useState<Store[]>(storeData);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [rejectModalVisible, setRejectModalVisible] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [activeStore, setActiveStore] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('Existing Stores');
  const [customReason, setCustomReason] = useState<string>('');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(route.params.user.name);
  const [email, setEmail] = useState<string>(route.params.user.email);
  const [userAddress, setUserAddress] = useState<string>(route.params.user.region);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = storeData.filter((store) =>
      store.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStores(filtered);
  };

  const handleStorePress = (store: Store) => {
    setSelectedStore(store);
    setModalVisible(true);
  };

  const handleAccept = () => {
    setModalVisible(false);
    console.log(`Store ${selectedStore?.name} accepted.`);
    navigateToSuccessfulStores();
  };

  const handleReject = () => {
    setModalVisible(false);
    setRejectModalVisible(true);
  };

  const handleConfirmRejection = () => {
    setRejectModalVisible(false);
    const finalReason =
      selectedReason === 'Custom Reason' ? customReason : selectedReason;
    console.log(`Store ${selectedStore?.name} rejected for reason: ${finalReason}`);
    setSelectedReason('');
    setCustomReason('');
  };

  const handleTabPress = (tab: Tab) => {
    setSelectedTab(tab.label);
    navigation.navigate(tab.route);
  };

  const navigateToSuccessfulStores = () => {
    navigation.navigate('existingStoreFormScreen');
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

  return (
    <View style={styles.container}>
      <View style={styles.container__inner}>
        <View style={styles.container_store}>
          <Image source={profileIcon} style={styles.profileImage} />
          <Text style={styles.title}>{username}</Text>
          <Text style={styles.merchertizername}>{userAddress}</Text>
        </View>
      </View>
      <View style={styles.searchContainer__main}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <Image source={SearchIcon} style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by store name"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleStorePress(item);
              setActiveStore(item.id);
            }}
            style={[styles.storeCard, activeStore === item.id && styles.activeCard]}
          >
            <View style={styles.storeRow}>
              <Image source={storeIcon} style={styles.storeImage} />
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{item.name}</Text>
                <Text style={styles.storeAddress}>{item.address}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.noResult}>No stores match your search.</Text>}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToHome}
          onPressIn={() => setHoveredButton('home')}
          onPressOut={() => setHoveredButton(null)}
        >
          <Image source={homeIcon1} style={styles.storeIcon} />
          <Text style={[styles.buttonText, hoveredButton === 'home' && styles.hoveredText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToStores}
          onPressIn={() => setHoveredButton('stores')}
          onPressOut={() => setHoveredButton(null)}
        >
          <Image source={storeIcon} style={styles.storeIcon} />
          <Text style={[styles.buttonText, hoveredButton === 'stores' && styles.hoveredText]}>Stores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToLogout}
          onPressIn={() => setHoveredButton('logout')}
          onPressOut={() => setHoveredButton(null)}
        >
          <Image source={logoutIcon} style={styles.storeIcon} />
          <Text style={[styles.buttonText, hoveredButton === 'logout' && styles.hoveredText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  container__inner: {
    backgroundColor: '#E34234',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  container_store: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  merchertizername: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer__main: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  searchButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    height: 20,
    width: 20,
  },
  storeCard: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  activeCard: {
    borderWidth: 2,
    borderColor: '#E34234',
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: 0,
    borderRadius: 20,
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  storeInfo: {
    
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    marginTop: 5,
  },
  hoveredText: {
    color: '#E34234',
  },
  storeIcon: {
    height: 30,
    width: 30,
  },
});

export default TestExistingStoresScreen;
