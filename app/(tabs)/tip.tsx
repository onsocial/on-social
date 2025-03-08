// app/(tabs)/tip.tsx
import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, TextInput, View, Alert, Modal, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { walletService } from '@services/wallet';
import { ThemeContext } from '@contexts/ThemeContext';
import { setTransactionStatus } from '@store/slices/walletSlice';
import { utils } from 'near-api-js';

const TipScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { accountId, transactionStatus, transactionError } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('0.1');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

  const openInputModal = () => setIsModalOpen(true);
  const closeInputModal = () => setIsModalOpen(false);
  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setStatusMessage('');
    dispatch(setTransactionStatus('idle'));
    router.replace('/(tabs)/tip');
  };

  const handleTip = async () => {
    if (!accountId) {
      Alert.alert('Info', 'Please connect your wallet.');
      try {
        await walletService.connect('tip');
        router.replace('/(tabs)/home');
      } catch (error) {
        router.replace('/(tabs)/tip');
      }
      return;
    }

    if (!recipient || !recipient.endsWith('.near')) {
      Alert.alert('Error', 'Please enter a valid .near recipient account.');
      return;
    }

    const nearAmount = utils.format.parseNearAmount(amount);
    if (!nearAmount) {
      Alert.alert('Error', 'Invalid amount entered.');
      return;
    }

    setStatusMessage('Initiating transaction...');
    try {
      await walletService.sendTransaction(
        recipient,
        [{ type: 'Transfer', params: { deposit: nearAmount } }],
        'tip'
      );
      setStatusMessage('Transaction sent, awaiting confirmation...');
    } catch (error: any) {
      console.log('TipScreen - Transaction declined or failed:', error.message);
      setStatusMessage('Transaction cancelled');
      closeInputModal();
      router.replace('/(tabs)/tip');
    }
  };

  useEffect(() => {
    console.log('TipScreen useEffect - transactionStatus:', transactionStatus, 'pathname:', pathname);
    if (transactionStatus === 'success' && pathname === '/(tabs)/tip') {
      setStatusMessage('Transaction successful!');
      openSuccessModal();
    } else if (transactionStatus === 'failed' || transactionStatus === 'cancelled') {
      setStatusMessage(transactionError || 'Transaction cancelled');
      if (pathname !== '/(tabs)/tip') {
        router.replace('/(tabs)/tip');
      }
    }
  }, [transactionStatus, transactionError, pathname, router]);

  return (
    <View className={`flex-1 justify-center items-center p-5 ${theme === 'dark' ? 'bg-dark-background' : 'bg-light-background'}`}>
      <Text className={`text-2xl font-bold mb-5 ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>Tip Someone</Text>
      <TouchableOpacity
        className="bg-white border border-gray-300 py-2 px-4 rounded-full flex-row items-center"
        onPress={openInputModal}
      >
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
            {statusMessage ? <Text>{statusMessage}</Text> : null}
            <Button title="Confirm" onPress={handleTip} />
          </View>
        </View>
      </Modal>

      <Modal visible={isSuccessModalOpen} animationType="fade" transparent>
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white p-5 rounded-lg w-11/12 max-w-md items-center">
            <Text className="text-lg font-bold mb-2 text-gray-800">Transaction Status</Text>
            <Text>{statusMessage}</Text>
            <Button title="Close" onPress={closeSuccessModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TipScreen;