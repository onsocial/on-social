// src/components/WalletConnectButton.tsx
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { walletService } from '@services/wallet';
import { Button } from '@components/Button';
import { StarCIconFilled } from '@assets/icons';
import { setConnectionStatus } from '@store/slices/walletSlice';

const WalletConnectButton = () => {
  const { connectionStatus } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConnect = async () => {
    if (walletService.isConnected()) {
      router.replace('/(tabs)/home');
      return;
    }

    setLoading(true);
    dispatch(setConnectionStatus('connecting'));
    try {
      await walletService.connect('index');
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Error', `Failed to connect wallet: ${error.message || 'Unknown error'}`);
      dispatch(setConnectionStatus('disconnected'));
      router.replace('/'); // Back to index on decline
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Button
        onClick={handleConnect}
        variant="primary"
        size="md"
        textClassName="font-semibold"
        loading={loading || connectionStatus === 'connecting'}
        disabled={loading || connectionStatus === 'connecting'}
        icon={<StarCIconFilled size={20} />}
      >
        {loading || connectionStatus === 'connecting' ? 'Connecting...' : "Let's connect"}
      </Button>
    </View>
  );
};

export default WalletConnectButton;