import { Alert } from 'react-native';
import { useWallet } from '@contexts/WalletContext';
import { useState } from 'react';
import { Button } from '@components/Button';

export default function WalletDisconnectButton() {
  const { isDisconnecting, disconnectWallet } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDisconnect = async () => {
    try {
      setIsProcessing(true);
      await disconnectWallet();
    } catch (error: any) {
      Alert.alert(
        'Error',
        'Failed to disconnect wallet: ' + (error.message || 'Unknown error'),
      );
    } finally {
      setIsProcessing(false);
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
