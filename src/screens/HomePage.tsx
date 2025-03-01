import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import '@assets/global.css';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text className="text-blue-400">Under Construction</Text>
      <TouchableOpacity className="mt-5 rounded bg-blue-400 p-2">
        <ActivityIndicator size="small" color="#fff" />
      </TouchableOpacity>
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
