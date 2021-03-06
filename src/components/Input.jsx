import { StyleSheet, TextInput } from 'react-native'

export default function Input({placeholder,secureTextEntry,onChangeText, autoCapitalize,multiline}) {
  return (
    <TextInput style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      multiline={multiline}
    autoCapitalize={autoCapitalize}
    />
  )
}

const styles = StyleSheet.create({
     input: {
        borderColor: "black",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        height: 49,
        marginBottom: 20,
        
    },
})