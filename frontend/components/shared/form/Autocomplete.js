import { View } from "react-native";
import { Menu, TextInput } from "react-native-paper";
import React, { useState } from "react";

const Autocomplete = ({
  value: origValue,
  label,
  data,
  setFormValue,
  cypressID,
  containerStyle,
  onChange: origOnChange,
  style = {},
}) => {
  const [value, setValue] = useState(origValue);
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  return (
    <View style={[containerStyle]}>
      <TextInput
        onFocus={() => {
          if (value.length === 0) {
            setMenuVisible(true);
          }
        }}
        label={label}
        style={style}
        onChangeText={(text) => {
          origOnChange(text);
          if (text && text.length >= 3) {
            setFilteredData(data);
            setMenuVisible(true);
          }else{
            setMenuVisible(false);
            setFilteredData([]);
          }
          setValue(text);
        }}
        value={value}
        mode="outlined"
        nativeID={cypressID}
      />
      {menuVisible && filteredData && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderWidth: 2,
            flexDirection: 'column',
            borderColor: 'grey',
          }}
          nativeID={`${cypressID}-menu`}
        >
          {filteredData.map((datum, i) => (
            <Menu.Item
              key={i}
              style={{ width: '100%' }}
              onPress={() => {
                setValue(datum);
                setFormValue(datum);
                console.log(datum);
                setMenuVisible(false);
              }}
              title={datum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Autocomplete;
