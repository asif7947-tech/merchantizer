import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Animated,
  Modal,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import uploadIcon from '../assets/uploadIcon.png';
import storeIcon from '../assets/storeIcons2.png';
import CameraIcon from '../assets/camaraIcon.png';
import profileIcon from '../assets/store.jpeg';
import tickIcon from '../assets/tickIcon.png';
import StoreIcon2 from '../assets/storeIcons2.png'
import homeIcon1 from '../assets/homeIcon.png'
import logoutIcon from '../assets/logout.png'
import { apiRequest, apiRoutes } from '../api/apis';
import {STORE_DETAILS} from '../api/types';
import { _getUserDetailsFromAsync } from '../utils/LocalStorage';
import { _getAuthTokenFromAsync } from '../utils/LocalStorage';
import { getImageType } from '../config/constant';


const ExistingStoreScreen = ({navigation,route}) => {
  const [region, setRegion] = useState('');
  const [posman, setPosman] = useState('');
  const [checklist, setChecklist] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [id, setId] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [locality, setLocality] = useState('');
  const [subLocality, setSubLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [bricksCodeName, setBricksCodeName] = useState('');
  const [popCode, setPopCode] = useState('');
  const [popName, setPopName] = useState('');
  const [popMarketName, setPopMarketName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contact, setContact] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [remarks, setRemarks] = useState('');
  const [stock, setStocks] = useState('');
  const [storeLogo, setStoreLogo] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [shopFrontImage, setShopFrontImage] = useState(null); // New state for shop front image
  const [storeInsideImage, setStoreInsideImage] = useState(null); // New state for store inside image
  const [storeOutsideImage, setStoreOutsideImage] = useState(null);
  const [storeImages, setStoreImages] = useState([]);
  const [shelfImages, setShelfImages] = useState([]);
  const [focusAnim] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [marchentName, setMarchentName] = useState('');
  const [storeName, setStoreName] = useState(route.params.storeName);
  const [storeId, setStoreId] = useState(route.params.storeId);
  


  console.log(route.params);

  const navigateToStores = () => {
    navigation.navigate('HomeScreen');
  };
  const navigateToHome = () => {
    navigation.navigate('HomePage');
  };
  const navigateToLogout = () => {
    navigation.navigate('Login');
  };
  const stockOptions = [
    {label: 'Calpol Tab', value: 'Calpol Tab'},
    {label: 'Calpol Syrup', value: 'Calpol Syrup'},
    {label: 'Calpol Drops', value: 'Calpol Drops'},
  ];

  const handleStockToggle = value => {
    setSelectedStocks(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value],
    );
  };

  const checklistOptions = [
    {label: 'Counter top', value: 'Counter top'},
    {label: 'Hanger', value: 'Hanger'},
    {label: 'Poster', value: 'Poster'},
    {label: 'Bunting', value: 'Bunting'},
  ];

  const handleItemToggle = value => {
    setCheckedItems(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value],
    );
  };

  const getStoreDtails = async() => {
    // API call to fetch store details
    // ...

    try {
      const response = await apiRequest(`${apiRoutes.STORE_DETAILS}/${route.params.storeId}`, 'get');
      // setStoreDetails(response.data);
      setRegion(response.data.region);
      setPosman(response.data.posman);
      setChecklist(response.data.checklist);
      setCity(response.data.city);
      setTown(response.data.town);
      setSupervisor(response.data.supervisor);
      setLocality(response.data.locallaty);
      setSubLocality(response.data.sub_locallaty);
      setLandmark(response.data.landmark);
      setBricksCodeName(response.data.brick_code_name);
      setPopCode(response.data.pop_code);
      setPopName(response.data.pop_name);
      setPopMarketName(response.data.pop_market_name);
      setOwnerName(response.data.owner_name);
      setContact(response.data.owner_contact_no);
      setNewAddress(response.data.new_address);
      setRemarks(response.data.remarks);
      setStocks(response.data.stock);
      setStoreLogo(response.data.store_logo);
      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
      setId(response.data.id);

      console.log('Store details:', response);
      console.log('Store details:',);
    } catch (error) {
      console.error('Error fetching store details:', error);
    }
  };

  useEffect(() => {
    _getUserDetailsFromAsync().then((user) => {
      setMarchentName(user.name);
    })
console.log(route.params);
    getStoreDtails();
  }, []);

  const items = [
    {label: 'Counter top', value: 'Counter top'},
    {label: 'Hanger', value: 'Hanger'},
    {label: 'Poster', value: 'Poster'},
    {label: 'Bunting', value: 'Bunting'},
  ];

  const toggleSelection = value => {
    setSelectedItems(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value],
    );
  };

  const handleImagePick = async type => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};

        console.log('Selected image:', source.uri);
        console.log('Selected image:', source);

        // Handling store images
        if (type === 'storeLogo') setStoreLogo(source.uri);
        if (type === 'shopFront') setShopFrontImage(source.uri);
        if (type === 'storeInside') setStoreInsideImage(source.uri);
        if (type === 'storeOutside') setStoreOutsideImage(source.uri);

        // Handling store images array with a limit of 3
        if (type === 'storeImages') {
          if (storeImages.length < 3) {
            setStoreImages(prevImages => [...prevImages, source.uri]);
          } else {
            Alert.alert(
              'Error',
              'You can upload a maximum of 3 images for the store.',
            );
          }
        }

        // Handling shelf images array with a limit of 6
        if (type === 'shelfImages') {
          if (shelfImages.length < 6) {
            setShelfImages(prevImages => [...prevImages, source.uri]);
          } else {
            Alert.alert(
              'Error',
              'You can upload a maximum of 6 images for the shelf.',
            );
          }
        }
      }
    });
  };

  const fetchLiveLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        Alert.alert(
          'Location Fetched',
          `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`,
        );
      },
      error => {
        Alert.alert('Error', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleSubmit = async() => {
    // if (!region || !city || !town || !supervisor || !ownerName || !contact) {
    //   Alert.alert('Error', 'Please fill all required fields');
    //   return;
    // }

    try {
      const formData = new FormData();

      // Append text fields
      formData.append('store_id', storeId);
      formData.append('owner_name', marchentName);
      formData.append('landmark', landmark);
      formData.append('owner_contact_no', contact);
      formData.append('new_address', newAddress);
      formData.append('remarks', remarks);
      formData.append('stock_available', selectedStocks.toString());
      formData.append('posm_deployed', 'test');
      formData.append('store_checklist', selectedItems.toString());
  
      // Append images dynamically based on API keys
      storeImages.forEach((image, index) => {
        console.log(image);
        const key = `shop_form_image${index + 1}`;
        console.log(`Image ${image.uri}`);
        console.log(`ImageType ${getImageType(image)}`);
        console.log(`key ${key}`);
        formData.append(key, {
          uri: image,
          type: getImageType(image), // Defaulting to jpeg if type is missing
          name: `${key}_${Date.now()}.jpg`,
      });
    });
  
    shelfImages.forEach((image, index) => {
      console.log(image);
      const key = `shop_posm_image${index + 1}`;
      console.log(`ImageType ${getImageType(image)}`);

      formData.append(key, {
        uri: image,
        type: getImageType(image), // Defaulting to jpeg if type is missing
        name: `${key}_${Date.now()}.jpg`,
    });
  });

  // console.log(formData);
  const response = await apiRequest(`${apiRoutes.UPDATE_STORE}`, 'post', formData);


  // Append text fields
//   const fields = {
//     store_id: storeId,
//     owner_name: marchentName,
//     landmark: landmark,
//     owner_contact_no: contact,
//     new_address: newAddress,
//     remarks: remarks,
//     stock_available: selectedStocks.toString(),
//     posm_deployed: 'test',
//     store_checklist: selectedItems.toString(),
// };

// Object.keys(fields).forEach(key => formData.append(key, fields[key]));

// Helper function to add images safely
const addImageToFormData = (key, image) => {
    if (image) {
        formData.append(key, {
            uri: image.uri,
            type: image.type || 'image/jpeg', // Defaulting to jpeg if type is missing
            name: image.fileName || `${key}_${Date.now()}.jpg`,
        });
    }
};

// // Append store images
// addImageToFormData('shop_form_image1', storeImages[0]);
// addImageToFormData('shop_form_image2', storeImages[1]);
// addImageToFormData('shop_form_image3', storeImages[2]);

// // Append shelf images
// addImageToFormData('shop_posm_image1', shelfImages[0]);
// addImageToFormData('shop_posm_image2', shelfImages[1]);
// addImageToFormData('shop_posm_image3', shelfImages[2]);
// addImageToFormData('shop_posm_image4', shelfImages[3]);

  // const response = await apiRequest(`${apiRoutes.UPDATE_STORE}`, 'post',{
  //   store_id: storeId,
  //   owner_name: marchentName,
  //   landmark: landmark,
  //   owner_contact_no: contact,
  //   new_address: newAddress,
  //   remarks: remarks,
  //   stock_available: selectedStocks.toString(),
  //   posm_deployed: 'test',
  // })
      console.log(response);
      if (response.status === true) {
        setModalVisible(true);
        // Alert.alert('Success', 'Form submitted successfully');
      } else {
        Alert.alert('Error', 'Form submission failed \n Please try again');
      }
      // console.log(response.data.status === 200);
    } catch (error) {
      console.error('Error creating form data:', error);
      Alert.alert('Error', 'Something went wrong \n Please try again');
    }

  };
  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
  };
  const focusAnimNewAddress = useRef(new Animated.Value(1)).current;
  const focusAnimRemarks = useRef(new Animated.Value(1)).current;
  const focusAnimCity = useRef(new Animated.Value(1)).current;
  const focusAnimTown = useRef(new Animated.Value(1)).current;
  const focusAnimSupervisor = useRef(new Animated.Value(1)).current;
  const focusAnimLocality = useRef(new Animated.Value(1)).current;
  const focusAnimSubLocality = useRef(new Animated.Value(1)).current;
  const focusAnimLandmark = useRef(new Animated.Value(1)).current;
  const focusAnimBricksCodeName = useRef(new Animated.Value(1)).current;
  const focusAnimPopCode = useRef(new Animated.Value(1)).current;
  const focusAnimPopName = useRef(new Animated.Value(1)).current;
  const focusAnimPopMarketName = useRef(new Animated.Value(1)).current;
  const focusAnimOwnerName = useRef(new Animated.Value(1)).current;
  const focusAnimContact = useRef(new Animated.Value(1)).current;
  const focusAnimStore = useRef(new Animated.Value(1)).current;
  const focusAnimPosman = useRef(new Animated.Value(1)).current;
  const focusAnimChecklist = useRef(new Animated.Value(1)).current;


  const handleFocusNewAddress = () => {
    Animated.sequence([
      Animated.timing(focusAnimNewAddress, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(focusAnimNewAddress, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.summarycontainer}>
        <View style={styles.container_store}>
          <Image source={profileIcon} style={styles.profileImage} />
          <Text style={styles.title}>{storeName} </Text>
          <Text style={styles.merchertizername}>{marchentName}</Text>
        </View>
      </View>

      <View style={styles.cardmain}>
        <View style={styles.labelsContainer}>
          {/* Existing fields */}
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>Region</Text>
            <Text style={styles.field}>{region}</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.field}>{city}</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>Town</Text>
            <Text style={styles.field}>{town}</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>Project</Text>
            <Text style={styles.field}>Project Alpha</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>Supervisor</Text>
            <Text style={styles.field}>John Doe</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>Merchandiser</Text>
            <Text style={styles.field}>Jane Smith</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>ID</Text>
            <Text style={styles.field}>{id}</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>Locality</Text>
            <Text style={styles.field}>{locality}</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>Sub Locality</Text>
            <Text style={styles.field}>{subLocality}</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>Brick Code Name</Text>
            <Text style={styles.field}>{bricksCodeName}</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>PoP Code</Text>
            <Text style={styles.field}>{popCode}</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>POP Name</Text>
            <Text style={styles.field}>{popName}</Text>
          </View>
          <View style={styles.labelFieldPair}>
            <Text style={styles.label}>POP Market Name</Text>
            <Text style={styles.field}>{popMarketName}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.titleForn}>FullFilled By Merchandiser</Text>
          {/* Landmark */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Landmark</Text>
            <Animated.View
              style={[
                styles.inputWrapper,
                {transform: [{scale: focusAnimLandmark}]}, // Apply scaling animation
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Landmark"
                value={landmark}
                onChangeText={setLandmark}
                onFocus={() =>
                  Animated.spring(focusAnimLandmark, {
                    toValue: 1.1,
                    useNativeDriver: true,
                  }).start()
                }
                onBlur={() =>
                  Animated.spring(focusAnimLandmark, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start()
                }
              />
            </Animated.View>
          </View>

          {/* Bricks Code Name */}

          {/* Owner Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Owner Name</Text>
            <Animated.View
              style={[
                styles.inputWrapper,
                {transform: [{scale: focusAnimOwnerName}]}, // Apply scaling animation
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Owner Name"
                value={ownerName}
                onChangeText={setOwnerName}
                onFocus={() =>
                  Animated.spring(focusAnimOwnerName, {
                    toValue: 1.1,
                    useNativeDriver: true,
                  }).start()
                }
                onBlur={() =>
                  Animated.spring(focusAnimOwnerName, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start()
                }
              />
            </Animated.View>
          </View>
          {/* Contact */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact</Text>
            <Animated.View
              style={[
                styles.inputWrapper,
                {transform: [{scale: focusAnimContact}]}, // Apply scaling animation
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Contact Number"
                value={contact}
                onChangeText={setContact}
                onFocus={() =>
                  Animated.spring(focusAnimContact, {
                    toValue: 1.1,
                    useNativeDriver: true,
                  }).start()
                }
                onBlur={() =>
                  Animated.spring(focusAnimContact, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start()
                }
              />
            </Animated.View>
          </View>

          {/* New Address */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Address</Text>
            <Animated.View
              style={[styles.inputWrapper, {transform: [{scale: focusAnim}]}]}>
              <TextInput
                style={styles.input}
                placeholder="Enter New Address"
                value={newAddress}
                onChangeText={setNewAddress}
                onFocus={() =>
                  Animated.spring(focusAnim, {
                    toValue: 1.1,
                    useNativeDriver: true,
                  }).start()
                }
                onBlur={() =>
                  Animated.spring(focusAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start()
                }
              />
            </Animated.View>
          </View>
          {/* Remarks */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Remarks</Text>
            <Animated.View
              style={[
                styles.inputWrapper,
                {transform: [{scale: focusAnimRemarks}]}, // Apply scaling animation
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Remarks"
                value={remarks}
                onChangeText={setRemarks}
                onFocus={() =>
                  Animated.spring(focusAnimRemarks, {
                    toValue: 1.1,
                    useNativeDriver: true,
                  }).start()
                }
                onBlur={() =>
                  Animated.spring(focusAnimRemarks, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start()
                }
              />
            </Animated.View>
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Stock Availabilty</Text>
            {/* Dropdown Trigger */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setIsStockOpen(prev => !prev)}>
              <Text style={styles.dropdownText}>
                {selectedStocks.length > 0
                  ? `Selected: ${selectedStocks.join(', ')}`
                  : 'Select Stock Items'}
              </Text>
            </TouchableOpacity>

            {/* Dropdown List */}
            {isStockOpen && (
              <View style={styles.dropdownList}>
                <FlatList
                  data={stockOptions}
                  keyExtractor={item => item.value}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.item,
                        selectedStocks.includes(item.value) &&
                          styles.selectedItem,
                      ]}
                      onPress={() => handleStockToggle(item.value)}>
                      <Text
                        style={[
                          styles.itemText,
                          selectedStocks.includes(item.value) &&
                            styles.selectedItemText,
                        ]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Posm Deployed</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setIsDropdownOpen(prev => !prev)}>
              <Text style={styles.dropdownText}>
                {selectedItems.length > 0
                  ? `Selected: ${selectedItems.join(', ')}`
                  : 'Select POSM'}
              </Text>
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={styles.dropdownList}>
                <FlatList
                  data={items}
                  keyExtractor={item => item.value}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.item,
                        selectedItems.includes(item.value) &&
                          styles.selectedItem,
                      ]}
                      onPress={() => toggleSelection(item.value)}>
                      <Text
                        style={[
                          styles.itemText,
                          selectedItems.includes(item.value) &&
                            styles.selectedItemText,
                        ]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
      
          <View style={styles.inputContainer}>
            <Text style={styles.label1}>Shop Facia/Consent Form Pictures</Text>

            <View style={styles.iconRow}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleImagePick('storeImages')}>
                <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleImagePick('storeImages')}>
                <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>{' '}
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleImagePick('storeImages')}>
                <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.imagePreviewContainer}>
              {storeImages.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image}}
                  style={styles.imagePreview}
                />
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label1}>Shelf/Posm Pictures</Text>

            <View style={styles.iconRow2}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleImagePick('shelfImages')}>
                <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleImagePick('shelfImages')}>
                <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleImagePick('shelfImages')}>
                <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleImagePick('shelfImages')}>
                <Image source={CameraIcon} style={styles.cameraIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.imagePreviewContainer}>
              {shelfImages.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image}}
                  style={styles.imagePreview}
                />
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button1} onPress={handleSubmit}>
          <Text style={styles.buttonText1}>Submit</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={handleCloseModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={tickIcon} style={styles.modalImage} />
              <Text style={styles.thankYouText}>Thank You</Text>
              <Text style={styles.successText}>
                You have successfully submitted your store
              </Text>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={handleCloseModal}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAEAEA',
    flexDirection: 'column',
    gap: 30,
    paddingBottom: 80,
  },

  cardmain: {
    marginTop:40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  container_store: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleForn: {
    color: '#E34234',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  merchertizername: {
    fontSize: 14,
    color: '#888',
  },
  labelsContainer: {
    marginTop: 16,
    padding: 10,
  },
  labelFieldPair: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
    borderBottomWidth: 1, // Adds the border
    borderBottomColor: '#ccc', // Set the color of the border
    paddingBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    marginBottom: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    marginTop: 15,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#fff',
    maxHeight: 200,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItemText: {
    fontWeight: 'bold',
    color: 'black',
  },
  field: {
    fontSize: 16,
    color: '#333',
    position: 'absolute',
    right: '0%',
  },
  card: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#E34234',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  summarycontainer: {
    backgroundColor: '#E34234',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  profileImage: {
    borderRadius: 50,
    height: 60,
    width: 60,
    position: 'absolute',
    transform: [{translateX: 0}, {translateY: -75}],
  },
  storeIcon: {
    height: 30,
    width: 30,
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
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: 'black',
  },
  label1: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
    color: '#333',
  },
  locationButton: {
    backgroundColor: '#0A1126',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    height: 55,
    paddingHorizontal: 10,
  },
  picker: {
    height: 55,
    width: '100%',
  },
  button1: {
    backgroundColor: '#E34234',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:30
  },
  buttonText1: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  uploadIcon: {
    height: 20,
    width: 20,
  },
  cameraIcon: {
    height: 28,
    width: 34,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    marginVertical: 15,
    padding: 10,
    paddingLeft: 20,
  },
  iconRow2: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 15,
    padding: 10,
  },
  uploadButton: {
    marginVertical: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
  },
  uploadText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  imagePreview: {
    width: 70,
    height: 70,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    marginBottom: 10,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    gap: 10,
  },
  thankYouText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#E34234',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalImage: {
    height: 50,
    width: 50,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop:5,
    paddingBottom:5,
    marginTop:10,

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

export default ExistingStoreScreen;
