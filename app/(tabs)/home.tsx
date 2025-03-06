import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useWallet } from '@contexts/WalletContext';
import WalletDisconnectButton from '@components/WalletDisconnectButton';

export default function HomeScreen() {
  const { accountId } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!accountId) {
      router.replace('/');
    }
  }, [accountId, router]);

  console.log('Rendering HomeScreen (feed), accountId:', accountId);
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="mb-5 text-2xl font-bold">OnSocial Feed</Text>
      <Text>Welcome, {accountId}!</Text>
      {/* Add feed content here */}
      <View className="mb-5" />
      <WalletDisconnectButton />
    </View>
  );
}
