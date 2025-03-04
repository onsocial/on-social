import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from '@components/Button';
import '@styles/global.css';

export default function HomePage() {
  return (
    <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background">
     <Button
        variant="primary"
        size="md"
        className="mt-5"
        loading = "true"
        textClassName="font-semibold" // Apply semibold text using Tailwind
        onClick={() => router.replace('/(app)')}
      >
       Under construction
      </Button>
    </View>
  );
}
