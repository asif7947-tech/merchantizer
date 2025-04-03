import React, {useEffect, useState} from 'react';
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
  Alert
} from 'react-native';
import SearchIcon from '../assets/searchIcon.png';
import DateIcon from '../assets/dateIcon.png';
import TimeIcon from '../assets/timeIcon.png';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import storeIcon from '../assets/store.jpeg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import StoreIcon1 from '../assets/storeIcons2.png'
import homeIcon1 from '../assets/homeIcon.png'
import logoutIcon from '../assets/logout.png'
import { apiRequest, apiRoutes } from '../api/apis';
import { getSlectedStore } from '../config/constant';
interface Store {
  id: string;
  name: string;
  region: string;
}

const storeData: Store[] = [
  { id: '1', name: 'Punjab Pharmacy', region: '6th road Rawalpindi' },
  { id: '2', name: 'Shaheen Chemists', region: 'Saddar Rawalpindi' },
  { id: '3', name: 'D-Watson', region: 'Blue Area Islamabad' },
  { id: '4', name: 'Ak-karim Pharmacy', region: 'Gulberg Greens Islamabad' },
  { id: '5', name: 'Punjab Pharmacy', region: '6th road Rawalpindi' },
];

const rejectionReasons = [
  'Owner Not available',
  'Stock Not available',
  'Permanently closed',
  'Temporary closed',
  'Out of city',
  'Address not found',
  'Custom Reason',
];

interface Tab {
  label: string;
  route: string;
  id: string;
}

const tabs: Tab[] = [
  { label: 'Existing Stores', route: 'ExistingStoreListScreen', id: 'existing' },
  { label: 'NC Stores', route: 'NcStoreListScreen', id: 'nc' },
  { label: 'New Stores', route: 'NewStoreListScreen', id: 'new' },
  { label: 'Successful Stores', route: 'StoreListScreen', id: 'successful' },
  { label: 'Rejected Stores', route: 'RejectedStoreListScreen', id: 'rejected' },
  { label: 'Out Of Stocks', route: 'OutOfStockListScreen', id: 'out/stock' },
];

interface StoreListScreenProps {
  navigation: NavigationProp<any>; // Replace `any` with your navigation type if available
    route: any;
}

interface STORE_LISTING_SCREEN_ROUTES {
  storeType: string;
}


const StoreListScreen: React.FC<StoreListScreenProps> = ({ navigation , route}) => {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [rejectModalVisible, setRejectModalVisible] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [storeType, setStoreType] = useState<string>(route.params.storeType);
  const [selectedTab, setSelectedTab] = useState<string>(getSlectedStore(route.params.storeType));
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  console.log(route.params.storeType);
  console.log(`Selected Tab: ${getSlectedStore(route.params.storeType)}`);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = filteredStores.filter(store =>
      store.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStores(filtered);
  };

  const handleTabPress = (tab: Tab) => {
    console.log(`Selected Tab: ${tab.label}`);
    setSelectedTab(tab.label);
    setStoreType(tab.id);
    // navigation.navigate(tab.route as never);
  };

  const navigateTo = (route: string) => {
    navigation.navigate(route as never);
  };


    const handleReject = () => {
      setModalVisible(false);
      setRejectModalVisible(true);
    };

    const handleAccept = () => {
      setModalVisible(false);
      console.log(`Store ${selectedStore?.name} accepted.`);
      navigation.navigate('existingStoreFormScreen',{
        storeName: selectedStore?.name,
        storeId: selectedStore?.id,
      })
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

    const getSlectedStoresData = async() => {
      console.log(storeType);
      try {
        const response = await apiRequest(`api/${storeType}/store`, 'get');
        console.log(response);
        console.log(response.data);
        setFilteredStores(response.data);
      } catch (error:any) {
        console.log(error.request);
        console.log(error.response);
        console.log(error);
      }
    }

    useEffect(() => {
      getSlectedStoresData();
    }, [storeType]);

  return (
    <View style={styles.container}>
      <View style={styles.container_store}>
        <Text style={styles.merchertizername}>Muhammad Usman</Text>
        <View style={styles.footerContainer}>
          <View style={styles.infoRow}>
            <Image source={DateIcon} style={styles.infoIcon} />
            <Text style={styles.infoText}> 2024-08-15</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={TimeIcon} style={styles.infoIcon} />
            <Text style={styles.infoText}>10:00 AM</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by store name"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>

       <Text style={styles.title}>Nc Stores</Text>
            <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.label}
                style={[
                  styles.tab,
                  selectedTab === tab.label && styles.tabActive,
                ]}
                onPress={() => handleTabPress(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab.label && styles.tabTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('existingStoreFormScreen', { 
                storeName: item.name,
                storeId: item.id
              });
              // navigateTo('existingStoreFormScreen');
            }}
            onPressIn={() => setHoveredIndex(index)}
            onPressOut={() => setHoveredIndex(null)}
            style={[
              styles.storeCard,
              hoveredIndex === index && styles.storeCardHovered,
            ]}
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
      />


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
    backgroundColor: '#EEEEEE',
  },
  flatlistContainer:
  {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding:10,
    borderRadius:20
  },
  flatlistContainerMain:
  {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  container_store: {
    backgroundColor: '#E34234',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginBottom: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 20,
    color: '#FFAA33',
  },
  merchertizername: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
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
  listContainer: {
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    marginBottom: 5,
    gap:10,
    paddingTop:20,
    paddingLeft:10,
    paddingRight:10,
  },
  tab: {
    height:40,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
    justifyContent:'center',
    alignContent:'center',
    paddingLeft:5,
    paddingRight:10,
    width:96,
  },
  tabActive: {
    backgroundColor: '#E34234',
  },
  tabText: {
    fontSize: 10,
    color: '#333',
    fontWeight: '600',
    textAlign:'center'
  
  },
  tabTextActive: {
    color: 'white',
  },
  storeCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor:'white'
  },
  
  storeCardHovered: {
    backgroundColor: '#CCCCFF',
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storeInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
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
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 0,
  },
  infoRow: {
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    padding: 5,
    marginBottom: 20,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: 'w',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
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
  reasonItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  reasonItemSelected: { backgroundColor: '#ddd' },
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
    backgroundColor:'green'
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
    justifyContent:'center',
    height:40
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop:5,
    paddingBottom:5,
    marginTop:10

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

  reasonText: {
    fontSize: 16,
    color: '#333',
  },
  hoveredText: {
    color:  '#E34234',
  },
  storeIcon:
  {
  height:30,
  width:30
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

  confirmButtonDisabled: {
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
  },

});

export default StoreListScreen;
