import { StyleSheet, Image, Dimensions } from 'react-native';

export default function Logo({style}) {
    return (
          <Image
            source={require('../public/mainlogo.png')}
            style={style}
          />
    );
  }

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
   
});