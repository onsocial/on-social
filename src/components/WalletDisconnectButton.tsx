// src/components/WalletDisconnectButton.tsx
import { Alert } from 'react-native';
import { useState } from 'react';
import { Button } from '@components/Button';
import { walletService } from '@services/wallet';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDisconnecting } from '@store/slices/walletSlice';

export default function WalletDisconnectButton() {
  const { isDisconnecting } = useSelector((state: any) => state); // Get disconnecting state from Redux
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDisconnect = async () => {
    try {
      setIsProcessing(true);
      dispatch(setIsDisconnecting(true));
      await walletService.disconnect();
    } catch (error: any) {
      Alert.alert(
        'Error',
        'Failed to disconnect wallet: ' + (error.message || 'Unknown error'),
      );
    } finally {
      setIsProcessing(false);
      dispatch(setIsDisconnecting(false));
    }
  };

  return (
    <Button
      variant="primary"
      size="md"
      onClick={handleDisconnect}
      disabled={isProcessing || isDisconnecting}
    >
      {isProcessing || isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
    </Button>
  );
}