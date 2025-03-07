import { useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useWallet } from '@contexts/WalletContext';
import { ThemeContext } from '@contexts/ThemeContext';

export default function ProfileScreen() {
  const { accountId } = useWallet();
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!accountId) {
      router.replace('/');
    }
  }, [accountId, router]);

  console.log('Rendering ProfileScreen, accountId:', accountId);
  return (
    <View className={`flex-1 items-center justify-center p-5 ${theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'}`}>
      <Text className={`mb-5 text-2xl font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>Profile</Text>
      <Text className={`${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>Account: {accountId}</Text>
      {/* Add profile content here */}
    </View>
  );
}
