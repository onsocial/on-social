import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ThemeToggle from '@components/ThemeToggle';

export default function AuthScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background">
      <ThemeToggle />

      <TouchableOpacity className="rounded-lg bg-blue-500 px-5 py-3">
        <Text
          className="text-lg font-semibold text-white"
          onPress={() => router.replace('/(app)')}
        >
          Let's connect
        </Text>
      </TouchableOpacity>
    </View>
  );
}
