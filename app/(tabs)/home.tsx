// app/(tabs)/home.tsx
import { useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import WalletDisconnectButton from '@components/WalletDisconnectButton';
import { ThemeContext } from '@contexts/ThemeContext';

export default function HomeScreen() {
  const { accountId } = useSelector((state: any) => state); // Get wallet state from Redux
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!accountId) {
      router.replace('/');
    }
  }, [accountId, router]);

  console.log('Rendering HomeScreen (feed), accountId:', accountId);
  return (
    <View className={`flex-1 items-center justify-center p-5 ${theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'}`}>
      <Text className={`mb-5 text-2xl font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>OnSocial Feed</Text>
      <Text className={`${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>Welcome, {accountId}!</Text>
      {/* Add feed content here */}
      <View className="mb-5" />
      <WalletDisconnectButton />
    </View>
  );
}