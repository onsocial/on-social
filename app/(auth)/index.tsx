import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import ThemeToggle from '@components/ThemeToggle';
import { Button } from '@components/Button';
import { StarCIconFilled } from '@assets/icons';

export default function AuthScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background">
      <ThemeToggle />
      <Button
        variant="primary"
        size="md"
        className="mt-5"
        textClassName="font-semibold"
        onClick={() => router.replace('/(app)')}
        icon={<StarCIconFilled size={20} />} // Size adjusted for button
      >
        Let's connect
      </Button>
    </View>
  );
}
