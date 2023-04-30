import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState('Option 1');

  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Option 1" value="Option 1" />
        <Picker.Item label="Option 2" value="Option 2" />
        <Picker.Item label="Option 3" value="Option 3" />
      </Picker>
    </View>
  );
};

export default Dropdown;