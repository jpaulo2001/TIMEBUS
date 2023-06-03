import { StyleSheet, TextInput, View, Text } from 'react-native';

export default function LocationForm() {
  return (
    <View style={styles.container}>
        <Text>Stop A</Text>
        <TextInput style={styles.textInput}></TextInput>
        <Text>Stop B</Text>
        <TextInput style={styles.textInput}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '35%',
        left: '25%',
        right: '25%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textInput: {
        width: '70%',
        borderWidth: 2,
        borderColor: 'black',
    }
});
