import { useState, useContext } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { useWallet } from '@hooks/useWallet';
import { ThemeContext } from '@contexts/ThemeContext'; // Adjust the import path as needed

export default function HomeScreen() {
  const { wallet, accountId, isDisconnecting, disconnectWallet } = useWallet();
  const { theme } = useContext(ThemeContext); // Access the current theme

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error: any) {
      Alert.alert(
        'Error',
        'Failed to disconnect wallet: ' + (error.message || 'Unknown error'),
      );
    }
  };

  // Use semantic text and background color classes from Tailwind config
  const textStyle = theme === 'dark' ? 'text-dark-text' : 'text-light-text';
  const backgroundStyle =
    theme === 'dark' ? 'bg-dark-background' : 'bg-light-background';

  console.log(
    'Rendering HomeScreen (/home), accountId:',
    accountId,
    'isDisconnecting:',
    isDisconnecting,
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
          <Button
            title={isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
            onPress={handleDisconnect}
            color="red"
            disabled={isDisconnecting}
          />
        </>
      ) : (
        <Text className={textStyle}>Loading account...</Text>
      )}
    </View>
  );
}
