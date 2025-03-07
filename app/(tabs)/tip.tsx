import React, { useState, useEffect, useContext } from 'react';
import { Button, Text, TextInput, View, Alert, Modal, TouchableOpacity, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { utils } from 'near-api-js';
import { useWallet } from '@contexts/WalletContext';
import { useTransaction } from '@contexts/TransactionContext';
import { ThemeContext } from '@contexts/ThemeContext';
import { Wallet } from '@near-wallet-selector/core';

const TipScreen: React.FC = () => {
  const { wallet, connectWallet, selector } = useWallet();
  const { setTransactionOrigin, getTransactionOrigin } = useTransaction();
  const { theme } = useContext(ThemeContext);
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('0.1');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

  const openInputModal = () => setIsModalOpen(true);
  const closeInputModal = () => setIsModalOpen(false);
  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setTransactionStatus('');
  };

  const handleTip = async () => {
    let currentWallet: Wallet | null = wallet;
    if (!currentWallet || !selector) {
      Alert.alert('Info', 'Please connect your wallet.');
      currentWallet = await connectWallet();
      if (!currentWallet || !selector) {
        Alert.alert('Error', 'Wallet connection failed.');
        return;
      }
    }

    if (!recipient) {
      Alert.alert('Error', 'Please enter a recipient account.');
      return;
    }

    if (!recipient.endsWith('.near')) {
      Alert.alert('Error', 'Recipient must be a valid .near account.');
      return;
    }

    const nearAmount = utils.format.parseNearAmount(amount);
    if (!nearAmount || nearAmount === '0') {
      Alert.alert('Error', 'Invalid amount entered.');
      return;
    }

    setTransactionStatus('Initiating transaction...');
    try {
      console.log(`Sending ${amount} NEAR to ${recipient}`);
      console.log('Transaction params:', { receiverId: recipient, deposit: nearAmount });

      const callbackUrl = Platform.OS === 'web' ? `${window.location.origin}/wallet-callback` : 'onsocial://wallet-callback';
      const walletInstance = await selector.wallet('bitte-wallet');

      // Set transaction origin before redirect
      setTransactionOrigin(pathname, 'tip');

      await walletInstance.signAndSendTransaction({
        receiverId: recipient,
        actions: [
          {
            type: 'Transfer',
            params: { deposit: nearAmount },
          },
        ],
        // @ts-ignore: Ignore the TypeScript error for callbackUrl
        callbackUrl,
      } as any);

      console.log('Transaction sent, wallet should redirect to:', callbackUrl);
    } catch (error: any) {
      console.error('Transaction error:', error);
      setTransactionStatus(`Transaction failed: ${error.message}`);
      Alert.alert('Error', `Transaction failed: ${error.message}`);
    }
  };

  const confirmTransaction = async () => {
    await handleTip();
  };

  // Handle callback in TipScreen
  useEffect(() => {
    const handleCallback = () => {
      const params = new URLSearchParams(window.location.search);
      const transactionHashes = params.get('transactionHashes');
      const { originRoute, transactionType } = getTransactionOrigin();
      if (transactionHashes && originRoute === pathname && transactionType === 'tip') {
        setTransactionStatus('Transaction Successful!');
        closeInputModal();
        openSuccessModal();
      }
    };

    if (Platform.OS === 'web') {
      window.addEventListener('popstate', handleCallback);
      handleCallback();
      return () => window.removeEventListener('popstate', handleCallback);
    }
  }, [pathname, getTransactionOrigin]);

  return (
    <View className={`flex-1 justify-center items-center p-5 ${theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'}`}>
      <Text className={`text-2xl font-bold mb-5 ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>Tip Someone</Text>

      <TouchableOpacity className="bg-white border border-gray-300 py-2 px-4 rounded-full flex-row items-center" onPress={openInputModal}>
        <Text className="text-gray-800 text-base font-semibold">Tip</Text>
      </TouchableOpacity>

      <Modal visible={isModalOpen} animationType="fade" transparent>
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white p-5 rounded-lg w-11/12 max-w-md items-center">
            <TouchableOpacity className="absolute top-1 right-1" onPress={closeInputModal}>
              <Text className="text-2xl text-gray-800">×</Text>
            </TouchableOpacity>
            <Text className="text-lg font-bold mb-2 text-gray-800">Send Tip</Text>
            <TextInput
              className="h-10 w-full border border-gray-300 rounded px-2 mb-5"
              placeholder="Recipient Address (.near)"
              value={recipient}
              onChangeText={setRecipient}
            />
            <TextInput
              className="h-10 w-full border border-gray-300 rounded px-2 mb-5"
              placeholder="Amount (NEAR)"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <Text className="text-base mb-5">Amount to send: {amount} NEAR</Text>
            {transactionStatus ? <Text>{transactionStatus}</Text> : null}
            <Button title="Confirm" onPress={confirmTransaction} />
          </View>
        </View>
      </Modal>

      <Modal visible={isSuccessModalOpen} animationType="fade" transparent>
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white p-5 rounded-lg w-11/12 max-w-md items-center">
            <Text className="text-lg font-bold mb-2 text-gray-800">Transaction Status</Text>
            <Text>{transactionStatus}</Text>
            <Button title="Close" onPress={closeSuccessModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TipScreen;