import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [counter, setCounter] = useState(0);

  function pressHandler() {
    setCounter(previous => {
      return previous + 1;
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ahoj Jarous, mozes si trenovat frontend, skus tu nic nedosrat, dik.</Text>
      <Text style={styles.text}>Nauc sa ako funguje useState hook, je to jeden z hookov, ktorý budes potrebovat.</Text>
      <Text style={styles.text}>Viem ze ani nevies co znamena hook zatial, ale neboj sa nic dozvies sa</Text>
      <Pressable style={styles.button} onPress={pressHandler}>{({pressed}) => <Text style={styles.text}>{pressed ? 'Stlacene' : 'Stlac ma kok'}</Text>}</Pressable>
      <Text style={styles.text}>{counter}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'purple'
  },
  text: {
    color: 'white'
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 20,
    margin: 20
  }
});
