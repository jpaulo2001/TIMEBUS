import { StyleSheet, View, Image } from 'react-native';

export default function Logo() {
    return (
          <Image
            source={require('../public/mainlogo.png')}
            style={styles.Image}
          />
    );
  }

const styles = StyleSheet.create({
    Image: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        resizeMode: 'contain',
        top: '-30%',
    },
});