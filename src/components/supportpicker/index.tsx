import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { FONTS, SIZES } from '../../constants';

interface Support {
  label: string;
  value: string;
}

let wr = SIZES.width / 391;
let hr = SIZES.height / 812;


interface SupportPickerProps {
  label: string;
  supportTypes: Support[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const SupportPicker = ({ label, supportTypes, selectedValue, onValueChange }: SupportPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleValueChange = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownButtonText}>{selectedValue || 'Select Type Of Support'}</Text>
      </TouchableOpacity>
      {modalVisible && (
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
       
              <View style={styles.modalContent}>
            <FlatList
              data={supportTypes}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleValueChange(item.value)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          </View>
    
        </Modal>
      )}
    </View>
  );
};

export default SupportPicker;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#30D792',
    height: hr*63,
    paddingLeft: wr*20,
    paddingRight: wr*15,
    paddingTop: hr*10,
    paddingBottom: hr*0,
  },
  label: {
    ...FONTS.label,
    color: 'black',
    marginLeft: wr*5,
    position: 'absolute',
    left: wr*15,
    top: hr*10,
  },
  dropdownButton: {
    marginTop: hr*7,
    paddingVertical: wr*10,
  },
  dropdownButtonText: {
    ...FONTS.paragraph,
    color: '#4E656F',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: wr*16,
    paddingVertical: hr*20,
    maxHeight: '80%',
    width: '80%',
  },
  modalSpacer: {
    flex: 1,
    width: '100%',
  },
  modalItem: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
});