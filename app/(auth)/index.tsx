import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import ThemeToggle from '@components/ThemeToggle';
import { Button } from '@components/Button';

export default function AuthScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background">
      <ThemeToggle />

      <Button
        variant="primary"
        size="md"
        className="mt-5"
        textClassName="font-semibold" // Apply semibold text using Tailwind
        onClick={() => router.replace('/(app)')}
      >
        Let's connect
      </Button>
    </View>
  );
}
