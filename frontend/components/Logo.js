import { StyleSheet, View, Image, Dimensions } from 'react-native';

export default function Logo() {
    return (
          <Image
            source={require('../public/mainlogo.png')}
            style={styles.Image}
          />
    );
  }

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    Image: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth*0.35,
        resizeMode: 'contain',
        top: windowHeight*-0.3,
        borderRadius: 25
    },
});