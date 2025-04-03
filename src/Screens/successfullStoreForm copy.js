import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import uploadIcon from '../assets/uploadIcon.png';
import storeIcon from '../assets/storeIcons2.png';
import CameraIcon from '../assets/camaraIcon.png'
const SuccessfulStoreScreen = ({navigation}) => {
  const [region, setRegion] = useState('');
  const [posman, setPosman] = useState('');
  const [checklist, setChecklist] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
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
  const [storeLogo, setStoreLogo] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [shopFrontImage, setShopFrontImage] = useState(null); // New state for shop front image
  const [storeInsideImage, setStoreInsideImage] = useState(null); // New state for store inside image
  const [storeOutsideImage, setStoreOutsideImage] = useState(null);
  const [storeImages, setStoreImages] = useState([]); 
  const [shelfImages, setShelfImages] = useState([]); 
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
              Alert.alert('Error', 'You can upload a maximum of 3 images for the store.');
            }
          }
    
          // Handling shelf images array with a limit of 6
          if (type === 'shelfImages') {
            if (shelfImages.length < 6) {
              setShelfImages(prevImages => [...prevImages, source.uri]);
            } else {
              Alert.alert('Error', 'You can upload a maximum of 6 images for the shelf.');
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

  const handleSubmit = () => {
    if (!region || !city || !town || !supervisor || !ownerName || !contact) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    Alert.alert('Success', 'Store successfully created!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.summarycontainer}>
        <Image source={storeIcon} style={styles.storeIcon} />
      <Text style={styles.title}>Store One</Text>
      </View>

      {/* Region */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Region</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={region}
            onValueChange={itemValue => setRegion(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Select Region" value="" />
            <Picker.Item label="Region 1" value="region1" />
            <Picker.Item label="Region 2" value="region2" />
            <Picker.Item label="Region 3" value="region3" />
          </Picker>
        </View>
      </View>

      {/* City */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter City"
          value={city}
          onChangeText={setCity}
        />
      </View>

      {/* Town */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Town</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Town"
          value={town}
          onChangeText={setTown}
        />
      </View>

      {/* Supervisor */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Supervisor</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Supervisor"
          value={supervisor}
          onChangeText={setSupervisor}
        />
      </View>

      {/* Locality */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Locality</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Locality"
          value={locality}
          onChangeText={setLocality}
        />
      </View>

      {/* Sub Locality */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sub Locality</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Sub Locality"
          value={subLocality}
          onChangeText={setSubLocality}
        />
      </View>

      {/* Landmark */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Landmark</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Landmark"
          value={landmark}
          onChangeText={setLandmark}
        />
      </View>

      {/* Bricks Code Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bricks Code Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Bricks Code Name"
          value={bricksCodeName}
          onChangeText={setBricksCodeName}
        />
      </View>

      {/* Pop Code */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pop Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Pop Code"
          value={popCode}
          onChangeText={setPopCode}
        />
      </View>

      {/* Pop Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pop Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Pop Name"
          value={popName}
          onChangeText={setPopName}
        />
      </View>

      {/* Pop Market Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pop Market Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Pop Market Name"
          value={popMarketName}
          onChangeText={setPopMarketName}
        />
      </View>

      {/* Owner Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Owner Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Owner Name"
          value={ownerName}
          onChangeText={setOwnerName}
        />
      </View>

      {/* Contact */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Contact Number"
          value={contact}
          onChangeText={setContact}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Posm Deployed</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={posman}
            onValueChange={itemValue => setPosman(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Select Posm" value="" />
            <Picker.Item label="Counter top" value="region1" />
            <Picker.Item label="Hanger" value="region2" />
            <Picker.Item label="Poster" value="region3" />
            <Picker.Item label="Bunting" value="region4" />
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Store Checklist</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={checklist}
            onValueChange={itemValue => setChecklist(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Select Checklist" value="" />
            <Picker.Item label="Counter top" value="region1" />
            <Picker.Item label="Hanger" value="region2" />
            <Picker.Item label="Poster" value="region3" />
            <Picker.Item label="Bunting" value="region4" />
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
  <Text style={styles.label}>Shop Facia/Consent Form Pictures</Text>
  <TouchableOpacity
    style={styles.uploadButton}
    onPress={() => handleImagePick('storeImages')}>
    <View style={styles.iconRow}>
      <Image source={CameraIcon} style={styles.cameraIcon} />
      <Image source={CameraIcon} style={styles.cameraIcon} />
      <Image source={CameraIcon} style={styles.cameraIcon} />
    </View>
  </TouchableOpacity>
  
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
  <Text style={styles.label}>Shelf/Posm Pictures</Text>
  
  <TouchableOpacity
    style={styles.uploadButton}
    onPress={() => handleImagePick('shelfImages')}>
    {/* Six Camera Icons Inside One Button */}
    <View style={styles.iconRow2}>
      <Image source={CameraIcon} style={styles.cameraIcon} />
      <Image source={CameraIcon} style={styles.cameraIcon} />
      <Image source={CameraIcon} style={styles.cameraIcon} />
      <Image source={CameraIcon} style={styles.cameraIcon} />
      <Image source={CameraIcon} style={styles.cameraIcon} />
      <Image source={CameraIcon} style={styles.cameraIcon} />
    </View>
  </TouchableOpacity>
  
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

      {/* New Address */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter New Address"
          value={newAddress}
          onChangeText={setNewAddress}
        />
      </View>

      {/* Remarks */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Remarks</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Remarks"
          value={remarks}
          onChangeText={setRemarks}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Shop Front</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImagePick('shopFront')}>
          <Text style={styles.uploadText}>Upload Image</Text>
          <Image source={uploadIcon} style={styles.uploadIcon} />
        </TouchableOpacity>
        {shopFrontImage && (
          <Image source={{uri: shopFrontImage}} style={styles.imagePreview} />
        )}
      </View>

      {/* Upload Store Inside Image */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Store Inside</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImagePick('storeInside')}>
          <Text style={styles.uploadText}>Upload Image</Text>
          <Image source={uploadIcon} style={styles.uploadIcon} />
        </TouchableOpacity>
        {storeInsideImage && (
          <Image source={{uri: storeInsideImage}} style={styles.imagePreview} />
        )}
      </View>

      {/* Upload Store Outside Image */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Store Outside</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImagePick('storeOutside')}>
          <Text style={styles.uploadText}>Upload Image</Text>
          <Image source={uploadIcon} style={styles.uploadIcon} />
        </TouchableOpacity>
        {storeOutsideImage && (
          <Image
            source={{uri: storeOutsideImage}}
            style={styles.imagePreview}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Live Location</Text>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={fetchLiveLocation}>
          <Text style={styles.buttonText}>Send Location</Text>
        </TouchableOpacity>
        {latitude && longitude && (
          <Text style={styles.locationText}>
            Latitude: {latitude}, Longitude: {longitude}
          </Text>
        )}
      </View>
      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  summarycontainer: {
    backgroundColor: 'transparent',
    width: 330,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#28a745', 
    flexDirection:'row',
    justifyContent:'flex-start',
    gap:70,
    paddingLeft:20
  },
  storeIcon:
  {
   height:30,
   width:30
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color:'black',
    marginTop:10
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
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
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  picker: {
    height: 55,
  },
  button: {
    backgroundColor: '#E34234',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  uploadIcon: {
    height: 20,
    width: 20,
  },
  cameraIcon:
  {
  height:28,
  width:34
  },
  iconRow:
  {
  flexDirection:'row',
  gap:55,
  flexWrap:'wrap'
  },
  iconRow2:
  {
  flexDirection:'row',
  gap:55,
  flexWrap:'wrap'
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
  },
  uploadText: {
    fontSize: 16,
    marginBottom: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imagePreviewContainer:
  {
    flexDirection:'row',
    gap:10,
    flexWrap:'wrap'
  }
});

export default SuccessfulStoreScreen;
