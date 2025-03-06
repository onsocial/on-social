import { useState } from 'react';
import { Button, Text, TextInput, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { utils } from 'near-api-js';
import { useWallet } from '@contexts/WalletContext';

export default function SendScreen() {
  const { wallet, accountId, isDisconnecting } = useWallet();
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const handleSendNear = async () => {
    if (!wallet || !recipient || !amount) {
      Alert.alert('Error', 'Please enter recipient and amount.');
      return;
    }

    try {
      const nearAmount = utils.format.parseNearAmount(amount);
      if (!nearAmount || nearAmount === '0') {
        Alert.alert('Error', 'Invalid amount entered.');
        return;
      }

      setIsSending(true);
      console.log(`Sending ${amount} NEAR to ${recipient} from ${accountId}`);

      const outcome = await wallet.signAndSendTransaction({
        receiverId: recipient,
        actions: [
          {
            type: 'Transfer',
            params: { deposit: nearAmount },
          },
        ],
      });

      setIsSending(false);
      Alert.alert('Success', `Sent ${amount} NEAR to ${recipient}`);
      console.log('Transaction success:', outcome);
      setRecipient('');
      setAmount('');
    } catch (error: any) {
      setIsSending(false);
      console.error('Failed to send NEAR:', error);
      Alert.alert(
        'Error',
        `Transaction failed: ${error.message || 'Unknown error'}`,
      );
    }
  };

  console.log(
    'Rendering SendScreen, accountId:',
    accountId,
    'isSending:',
    isSending,
    'isDisconnecting:',
    isDisconnecting,
  );
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="mb-5 text-2xl font-bold">Send NEAR</Text>
      {accountId ? (
        <>
          <Text className="my-2 text-lg">Connected as: {accountId}</Text>
          <TextInput
            className="my-2 h-12 w-4/5 rounded-lg border border-gray-300 p-2"
            placeholder="Recipient Address"
            value={recipient}
            onChangeText={setRecipient}
            editable={!isSending && !isDisconnecting}
          />
          <TextInput
            className="my-2 h-12 w-4/5 rounded-lg border border-gray-300 p-2"
            placeholder="Amount (NEAR)"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            editable={!isSending && !isDisconnecting}
          />
          <Button
            title={isSending ? 'Sending...' : 'Send NEAR'}
            onPress={handleSendNear}
            disabled={isSending || isDisconnecting}
          />
          {isSending && (
            <Text className="mt-2 text-sm text-gray-500">
              Please approve the transaction in Bitte Wallet.
            </Text>
          )}
        </>
      ) : (
        <Text>Loading account...</Text>
      )}
    </View>
  );
}
