import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Linking from 'expo-linking';
import { useWallet } from '@contexts/WalletContext';

export default function WalletCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setAccountId } = useWallet(); // Now includes setAccountId

  useEffect(() => {
    const { account_id, all_keys } = params;
    console.log('WalletCallback useEffect, params:', params);
    if (account_id) {
      console.log('User signed in with account:', account_id);
      setAccountId(account_id as string); // Update WalletContext
      router.replace('/(tabs)/home');
    } else {
      console.log('No account_id found, redirecting to /');
      router.replace('/');
    }
  }, [params, router, setAccountId]);

  console.log('Rendering WalletCallback');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Processing wallet connection...</Text>
    </View>
  );
}
