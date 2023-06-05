import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity, } from 'react-native';

export default function LocationForm() {
  

  return (
    <View style={styles.container}>
        <View style={styles.textInputConainer}>
          <Text>Stop A</Text>
            <TextInput style={styles.textInput}></TextInput>
          <Text>Stop B</Text>
            <TextInput style={styles.textInput}></TextInput>
        </View>
          
        <TouchableOpacity style= {styles.searchButton}>
          <Image source={require('../public/assets/buttons/search.png')} style={styles.searchButtonImage}/>
        </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '40%',
        left: '20%',
        right: '20%',
        height: '10%',
        //borderWidth: 2,
        //borderColor: 'black',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textInputConainer:{
        width:'70%',
    },
    textInput: {
        height: '35%',
        width: '100%',
        borderWidth: 2,
        borderColor: 'black',

        borderBottomLeftRadius:100,
        borderTopLeftRadius:100,
        paddingHorizontal: 10,
    },
    searchButton: {
      borderWidth: 2,
      //borderColor: 'black',
      width: '30%',
      height: 70,
      borderTopRightRadius:100,
      borderBottomRightRadius:100,
      bottom:'0%',
      top:'4%',
    },
    searchButtonImage: {
      width: 50,
      resizeMode: 'contain',
      top: '30%',
      left: '0%',
      height: 40,
      zIndex: 3,
    },
});
