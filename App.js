import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Card from './src/components/Card';
import users from './assets/data/users';

const App = () => {
  return (
    <View style={styles.container}>
      <Card user={users[2]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '95%',
    height: '70%',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  bio: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 25,
  },
  info: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '20%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default App;
