import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import '@styles/global.css';

export default function HomePage() {
  return (
    <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background">
      <Text className="text-base font-semibold text-blue-400">
        Under Construction
      </Text>

      <TouchableOpacity className="mt-5 rounded bg-blue-400 p-2">
        <ActivityIndicator size="small" color="#fff" />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
