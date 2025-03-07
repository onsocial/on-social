import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useWallet } from '@contexts/WalletContext';
import { useTransaction } from '@contexts/TransactionContext';

const WalletCallback: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setAccountId } = useWallet();
  const { getTransactionOrigin, clearTransactionOrigin } = useTransaction();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;

    const handleCallback = () => {
      const { account_id, transactionHashes } = params as { account_id?: string; transactionHashes?: string };
      const { originRoute } = getTransactionOrigin();

      console.log('WalletCallback params:', JSON.stringify(params, null, 2));
      if (account_id && isMounted.current) {
        console.log('User signed in with account:', account_id);
        setAccountId(account_id);
        router.replace('/(tabs)/home');
      } else if (transactionHashes && isMounted.current) {
        console.log('Transaction completed:', transactionHashes);
        const redirectRoute = originRoute || '/(tabs)/home'; // Default to home if no origin
        router.replace(redirectRoute);
        clearTransactionOrigin();
      } else if (isMounted.current) {
        console.log('No account_id or transactionHashes, redirecting to /');
        router.replace('/');
      }
    };

    const timer = setTimeout(() => {
      if (isMounted.current) {
        handleCallback();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      isMounted.current = false;
    };
  }, [params, router, setAccountId, getTransactionOrigin, clearTransactionOrigin]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Processing wallet callback...</Text>
    </View>
  );
};

export default WalletCallback;