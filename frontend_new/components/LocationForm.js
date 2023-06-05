import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity, Dimensions} from 'react-native';

export default function LocationForm() {
  

  return (
    <View style={styles.container}>
        <View style={styles.textInputConainer}>
          <Text style={styles.stopLabel}>Stop A</Text>
            <TextInput style={styles.textInput}></TextInput>
          <Text style={styles.stopLabel}>Stop B</Text>
            <TextInput style={styles.textInput}></TextInput>
        </View>
          
        <TouchableOpacity style= {styles.searchButton}>
          <Image source={require('../public/assets/buttons/search.png')} style={styles.searchButtonImage}/>
        </TouchableOpacity>
    </View>

  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: windowHeight*0.35,
        left: windowWidth*0.20,
        right:  windowWidth*0.20,
        height: windowHeight*0.1,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textInputConainer:{
        width: windowWidth*0.41,
    },
    textInput: {
        height: windowHeight*0.04,
        width: windowWidth*0.4,
        borderWidth: 2,
        borderColor: 'black',
        borderBottomLeftRadius:100,
        borderTopLeftRadius:100,
        paddingHorizontal: 10,
    },
    searchButton: {
      borderWidth: 2,
      //borderColor: 'black',
      width: windowWidth*0.2,
      height: windowHeight*0.1,
      borderTopRightRadius:100,
      borderBottomRightRadius:100,
      bottom: 0,
      top:windowHeight*0.01,
    },
    searchButtonImage: {
      width: windowWidth* 0.1,
      resizeMode: 'contain',
      height: windowHeight*0.05,
      top: windowHeight*0.02,
      left: windowWidth*0.02,
      zIndex: 3,
    },

    stopLabel: {
      height: windowHeight*0.02,
      width: windowWidth*0.2,
    }
});
