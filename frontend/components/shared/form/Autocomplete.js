import { View } from "react-native";
import { Menu, TextInput } from "react-native-paper";
import React, { useState,useEffect } from "react";

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
  const handleChangeText = (text) => {
    origOnChange(text);
    setValue(text);
  };
  useEffect(() => {
    if(!data || value.length <3 ){
      setMenuVisible(false);
    }else{
      setMenuVisible(true);
    }
  }, [data,value]);
  return (
    <View style={[containerStyle]}>
      <TextInput
        onFocus={() => {
          if (data && value.length >= 3 ) {
            setMenuVisible(true);
          }
        }}
        onBlur={() => {setMenuVisible(false);}}
        label={label}
        style={style}
        onChangeText={handleChangeText}
        value={value}
        mode="outlined"
        nativeID={cypressID}
      />
      {menuVisible && data && (
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
          {data.map((datum, i) => (
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
