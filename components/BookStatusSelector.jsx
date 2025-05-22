import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const BookStatusSelector = ({ status, onChange }) => {
  const [selectedStatus, setSelectedStatus] = useState(status || 'Wish List');

  const handleSelect = (newStatus) => {
    setSelectedStatus(newStatus);
    onChange?.(newStatus);
  };

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View style={styles.container}>
      {['Wish List', 'Completed'].map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selectedStatus === option && styles.selected,
          ]}
          onPress={() => handleSelect(option)}
        >
          <Text
            style={[
              styles.buttonText,
              { color: theme.text},
              selectedStatus === option && styles.selectedText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BookStatusSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
  },
  selected: {
    backgroundColor: Colors.primary
  },
  buttonText: {
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#fff',
  },
});
