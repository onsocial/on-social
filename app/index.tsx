import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import WalletConnectButton from '@components/WalletConnectButton';
import ThemeToggle from '@components/ThemeToggle';
import '@styles/global.css';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const { accountId } = useSelector((state: any) => state);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log('Rendering HomeScreen (login)', { accountId });

  useEffect(() => {
    if (isMounted && accountId) {
      router.replace('/(tabs)/home'); // Auto-redirect if connected
    }
  }, [isMounted, accountId, router]);

  if (!isMounted || accountId) {
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