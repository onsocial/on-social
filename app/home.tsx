import { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { useWallet } from '@hooks/useWallet';
import { ThemeContext } from '@contexts/ThemeContext'; // Adjust the import path as needed
import WalletDisconnectButton from '@components/WalletDisconnectButton'; // Adjust the import path as needed

export default function HomeScreen() {
  const { wallet, accountId } = useWallet();
  const { theme } = useContext(ThemeContext); // Access the current theme

  // Use semantic text and background color classes from Tailwind config
  const textStyle = theme === 'dark' ? 'text-dark-text' : 'text-light-text';
  const backgroundStyle =
    theme === 'dark' ? 'bg-dark-background' : 'bg-light-background';

  console.log(
    'Rendering HomeScreen (/home), accountId:',
    accountId,
  );
  return (
    <View
      className={`flex-1 items-center justify-center p-5 ${backgroundStyle}`}
    >
      <Text className={`mb-5 text-2xl font-bold ${textStyle}`}>OnSocial</Text>
      {accountId ? (
        <>
          <Text className={`my-2 text-lg ${textStyle}`}>
            Connected as: {accountId}
          </Text>
          <WalletDisconnectButton />
        </>
      ) : (
        <Text className={textStyle}>Loading account...</Text>
      )}
    </View>
  );
}
