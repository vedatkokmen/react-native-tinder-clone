import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Card from './src/components/Card';
import AnimatedStack from './src/components/AnimatedStack';
import users from './assets/data/users';

const App = () => {
  return (
    <View style={styles.container}>
      <AnimatedStack
        data={users}
        renderItem={({item}) => <Card user={item} />}
      />
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
});

export default App;
