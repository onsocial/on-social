import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useWallet } from '@contexts/WalletContext';

export default function ProfileScreen() {
  const { accountId } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!accountId) {
      router.replace('/');
    }
  }, [accountId, router]);

  console.log('Rendering ProfileScreen, accountId:', accountId);
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="mb-5 text-2xl font-bold">Profile</Text>
      <Text>Account: {accountId}</Text>
      {/* Add profile content here */}
    </View>
  );
}
