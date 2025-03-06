import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useWallet } from '@contexts/WalletContext';
import { Button } from '@components/Button';
import { StarCIconFilled } from '@assets/icons';

const WalletConnectButton = () => {
  const { isConnecting, connectWallet } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await connectWallet();
    } catch (error: any) {
      Alert.alert(
        'Error',
        'Failed to connect wallet: ' + (error.message || 'Unknown error'),
      );
    }
  };

  return (
    <View>
      <Button
        onClick={handleConnect}
        variant="primary"
        size="md"
        textClassName="font-semibold"
        loading={loading || isConnecting}
        disabled={loading || isConnecting}
        icon={<StarCIconFilled size={20} />}
      >
        {loading || isConnecting ? 'Connecting...' : "Let's connect"}
      </Button>
    </View>
  );
};

export default WalletConnectButton;
