import React, { useEffect, useState } from 'react';
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
  Alert,
} from 'react-native';
import SearchIcon from '../assets/searchIcon.png';
import profileIcon from '../assets/profileImage.jpg';
import DateIcon from '../assets/dateIcon.png';
import TimeIcon from '../assets/timeIcon.png';
import { useNavigation } from '@react-navigation/native';
import storeIcon from '../assets/store.jpeg';
import StoreIcon1 from '../assets/storeIcons2.png';
import homeIcon1 from '../assets/homeIcon.png';
import logoutIcon from '../assets/logout.png';
import { apiRequest, apiRoutes } from '../api/apis';
import { authToken, setAuthToken } from '../api';
import { _getAuthTokenFromAsync, _getUserDetailsFromAsync } from '../utils/LocalStorage';
import axios from 'axios';
import { STORE_LISTING_DATA } from '../api/types';

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
      user: User | any | null;
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

const ExistingStoresScreen: React.FC<ExistingStoresScreenProps> = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredStores, setFilteredStores] = useState<STORE_LISTING_DATA[]>([]);
  const [selectedStore, setSelectedStore] = useState<STORE_LISTING_DATA | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [rejectModalVisible, setRejectModalVisible] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [activeStore, setActiveStore] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('Existing Stores');
  const [customReason, setCustomReason] = useState<string>('');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(route?.params?.user?.name? route.params.user.name : '');
  const [email, setEmail] = useState<string>(route?.params?.user?.email? route.params.user.email : '');
  const [userAddress, setUserAddress] = useState<string>(route?.params?.user?.region? route.params.user.region : '');

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = filteredStores.filter((store) =>
      store.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStores(filtered);
  };

  const handleStorePress = (store: STORE_LISTING_DATA) => {
    setSelectedStore(store);
    setModalVisible(true);
  };

  const handleAccept = () => {
    setModalVisible(false);
    console.log(`Store ${selectedStore?.name} accepted.`);
    navigation.navigate('existingStoreFormScreen',{
      storeName: selectedStore?.name,
      storeId: selectedStore?.id,});
  };

  const handleReject = () => {
    setModalVisible(false);
    setRejectModalVisible(true);
  };

  const handleConfirmRejection = async() => {
    setRejectModalVisible(false);
    const finalReason =
      selectedReason === 'Custom Reason' ? customReason : selectedReason;
    console.log(`Store ${selectedStore?.name} rejected for reason: ${finalReason}`);
    setSelectedReason('');
    setCustomReason('');

    try {
      const response = await apiRequest(apiRoutes.STRORE_NOT_AVAILABLE, 'post', {
        store_id: selectedStore?.id,
        reason: finalReason,
      });
      console.log(response);
      Alert.alert('Success', 'Store rejected successfully!');
    } catch (error) {
      console.log(error);
    }

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

  const getStoreListing = async() => {
    try {
      const response = await apiRequest(apiRoutes.HOME_STORE_LISTING, 'get');
      console.log(response);
      console.log(response.data);
      setFilteredStores(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    _getUserDetailsFromAsync().then((data) => {
      console.log(data);
      setUsername(data.name);
      setEmail(data.email);
      setUserAddress(data.region);
    });
    _getAuthTokenFromAsync().then((data) => {
      console.log(data);
      setAuthToken(data? data : '');
    });

    getStoreListing();
  }, []);

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleStorePress(item);
              setActiveStore(item.id.toString());
            }}
            style={[styles.storeCard, activeStore === item.id.toString() && styles.activeCard]}
          >
            <View style={styles.storeRow}>
              <Image source={storeIcon} style={styles.storeImage} />
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{item.name}</Text>
                <Text style={styles.storeAddress}>{item.region}</Text>
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
          <Image source={StoreIcon1} style={styles.storeIcon} />
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

      {/* Modal for Store Actions */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Stock Available or Not</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.acceptButton]}
                      onPress={handleAccept}
                    >
                      <Text style={styles.buttonText}>Available</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.rejectButton]}
                      onPress={handleReject}
                    >
                      <Text style={styles.buttonText}>Not Available</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Modal for Rejection Reasons */}
                  <Modal visible={rejectModalVisible} transparent animationType="slide">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Select Rejection Reason</Text>
                  <ScrollView>
                    {rejectionReasons.map(reason => (
                      <TouchableOpacity
                        key={reason}
                        style={[
                          styles.reasonItem,
                          selectedReason === reason && styles.reasonItemSelected,
                        ]}
                        onPress={() => setSelectedReason(reason)}
                      >
                        <Text style={styles.reasonText}>{reason}</Text>
                      </TouchableOpacity>
                    ))}
                    {selectedReason === 'Custom Reason' && (
                      <TextInput
                        style={styles.customInput}
                        placeholder="Enter custom reason"
                        value={customReason}
                        onChangeText={setCustomReason}
                      />
                    )}
                  </ScrollView>
                  <TouchableOpacity
                    style={[
                      styles.confirmButton, // New class name
                      !selectedReason || (selectedReason === 'Custom Reason' && !customReason)
                        ? styles.confirmButtonDisabled // Disabled state styling
                        : null,
                    ]}
                    onPress={handleConfirmRejection}
                    disabled={!selectedReason || (selectedReason === 'Custom Reason' && !customReason)}
                  >
                    <Text style={styles.confirmButtonText}>Confirm</Text> {/* Updated class name */}
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    gap: 0,
  },
  container__inner: {
    backgroundColor: '#E34234',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: 0,
    borderRadius: 20,
  },
  flatlistContainerMain: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    paddingLeft: 20,
    paddingRight: 20,
  },
  container_store: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    borderRadius: 20,
    marginBottom: 20,
    top: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  merchertizername: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  profileImage: {
    borderRadius: 50,
    height: 60,
    width: 60,
    position: 'absolute',
    transform: [{translateX: 0}, {translateY: -75}],
  },
  searchContainer__main: {
    padding: 20,
    marginTop: 60,
  },
  reasonText: {
    fontSize: 16,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '',
  },
  customInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  storeCard: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: 'white',
  },
  storeCardHovered: {
    backgroundColor: '#CCCCFF',
  },

  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
  },
  storeInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  listContainer: {
    marginHorizontal: 6,
  },
  activeCard: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#cccfff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: 'white',
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 5,
  },
  storeAddress: {
    fontSize: 14,
    color: 'black',
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
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
    color: '#E34234',
  },
  storeIcon: {
    height: 30,
    width: 30,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalValue: {
    fontSize: 16,
    color: '#555',
  },
  reasonItem: {padding: 10, borderBottomWidth: 1, borderColor: '#ccc'},
  reasonItemSelected: {backgroundColor: '#ddd'},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'green',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  confirmButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
    gap: 10,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tab: {
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 5,
    paddingRight: 10,
    width: 96,
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
  },
  tabActive: {
    backgroundColor: '#E34234',
  },
  tabText: {
    fontSize: 10,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  tabTextActive: {
    color: 'white',
  },
  footer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default ExistingStoresScreen;