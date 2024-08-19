import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const SelectDropdown = ({
  placeholder = 'Select an emotion',
  style,
  open = false,
  setOpen,
  value,
  setValue,
  options=[],
  containerStyle,
}) => {
  const [items, setItems] = useState(options);
  return (
    <DropDownPicker
    containerStyle={containerStyle}
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      items={items}
      setItems={setItems}
      placeholder={placeholder}
      style={style}
    />
  );
};

export default SelectDropdown;
