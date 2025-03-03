import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


export default function AuthScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background">
      

      <TouchableOpacity
        className="rounded-lg bg-blue-500 px-5 py-3"
        onPress={() => router.replace('/(app)')}
      >
        <Text className="text-lg font-semibold text-white">
          Let's connect
        </Text>
      </TouchableOpacity>
    </View>
  );
}
