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
    if(text.length <3 ){
      setMenuVisible(false);
    }else{
      setMenuVisible(true);
    }
    origOnChange(text);
    setValue(text);
  };
  useEffect(() => {
    setValue(origValue);
  }, [origValue]);
  return (
    <View style={[containerStyle]}>
      <TextInput
        onFocus={() => {
          if (data && value.length >= 3 && data.length > 0 ) {
            setMenuVisible(true);
          }
        }}
        onBlur={() => {setTimeout(()=>setMenuVisible(false),200)}}
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
          {data.map((suggestion, i) => (
            <Menu.Item
              key={i}
              style={{ width: '100%' }}
              onPress={() => {
                setValue(suggestion.label);
                setFormValue(suggestion);
                setMenuVisible(false);
              }}
              title={suggestion.label}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Autocomplete;
