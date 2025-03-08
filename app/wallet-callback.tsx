// app/wallet-callback.tsx
import React, { useEffect, useRef } from 'react';
import { Text, View, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setConnectionStatus, setTransactionStatus, setTransactionError } from '@store/slices/walletSlice';

const WalletCallback: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;

    const handleCallback = () => {
      const { account_id, transactionHashes, error, from } = params as {
        account_id?: string;
        transactionHashes?: string;
        error?: string;
        from?: string;
      };

      console.log('WalletCallback params:', JSON.stringify(params, null, 2));

      if (account_id && isMounted.current) {
        console.log('User signed in with account:', account_id);
        dispatch(setConnectionStatus('connected'));
        router.replace('/(tabs)/home');
      } else if (transactionHashes && isMounted.current) {
        console.log('Transaction completed:', transactionHashes);
        dispatch(setTransactionStatus('success'));
        const redirectRoute = from === 'tip' ? '/(tabs)/tip' : '/(tabs)/home';
        router.replace(redirectRoute);
      } else if (error && isMounted.current) {
        console.log('Wallet action declined or failed:', error);
        if (from === 'index') {
          dispatch(setConnectionStatus('disconnected'));
        } else if (from === 'tip') {
          dispatch(setTransactionStatus('cancelled'));
          dispatch(setTransactionError(error));
          router.replace('/(tabs)/tip');
        } else {
          router.replace('/(tabs)/home');
        }
      } else if (isMounted.current) {
        console.log('No actionable params, assuming cancel');
        if (from === 'index') {
          dispatch(setConnectionStatus('disconnected'));
          router.replace('/');
        } else if (from === 'tip') {
          dispatch(setTransactionStatus('cancelled'));
          dispatch(setTransactionError('User cancelled or timeout'));
          router.replace('/(tabs)/tip');
        } else {
          router.replace('/(tabs)/home');
        }
      }
    };

    if (Platform.OS !== 'web') {
      handleCallback();
    } else {
      const timer = setTimeout(() => {
        if (isMounted.current) handleCallback();
      }, 100);
      return () => clearTimeout(timer);
    }

    return () => {
      isMounted.current = false;
    };
  }, [params, router, dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Processing wallet callback...</Text>
    </View>
  );
};

export default WalletCallback;