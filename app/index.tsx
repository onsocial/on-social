// app/index.tsx
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import WalletConnectButton from '@components/WalletConnectButton';
import ThemeToggle from '@components/ThemeToggle';
import '@styles/global.css';

export default function HomeScreen() {
  const { accountId } = useSelector((state: any) => state);
  const router = useRouter();

  console.log('Rendering HomeScreen (login)', { accountId });

  if (accountId) {
    router.replace('/(tabs)/home'); // Auto-redirect if connected
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center bg-light-background p-5 dark:bg-dark-background">
      <Text className="text-lg mb-5">Welcome! Connect your wallet to get started.</Text>
      <WalletConnectButton />
      <ThemeToggle />
    </View>
  );
}