import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import '@assets/global.css';
import HomePage from '@screens/HomePage';

export default function App() {
  return (
    <View style={styles.container}>
      <HomePage />
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
  },
});
