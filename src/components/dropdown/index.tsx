import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { icons } from '../../constants';
import { useNavigation } from '@react-navigation/native';

export default function Dropdown({ sendData }: any) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedname, setSelectedName] = useState('');
  const navigation = useNavigation()

  const handleForward = () => {
    navigation.navigate('Forward' as never, { sentData: sendData } as never)
    setShowDropdown(false);
  };

  const handleReply = () => {
    navigation.navigate('Reply' as never, { sentData: sendData } as never)
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <View style={styles.container}>
      {/* Mail screen content */}

      {/* Dropdown */}
      <TouchableOpacity onPress={toggleDropdown}>
        <Image source={icons.dots} style={styles.dropdownImage} />
      </TouchableOpacity>

      <Modal
        visible={showDropdown}
        animationType="fade"
        transparent
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={toggleDropdown}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={{flexDirection:'row', gap:5}} onPress={handleForward}>
            <Image style={{ height: 18, width: 18 }} source={icons.forward} resizeMode='contain' />
              <Text>Forward</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 5, flexDirection:'row', gap:5}} onPress={handleReply}>
            <Image style={{ height: 18, width: 18 }} source={icons.reply} resizeMode='contain' />
              <Text>Reply</Text>
            </TouchableOpacity>
            {/* Add more dropdown options as needed */}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  dropdownContainer: {
    position: 'absolute',
    top: 130,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  dropdownImage: {
    width: 20,
    height: 20,
   
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
