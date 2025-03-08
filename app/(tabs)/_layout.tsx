// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext } from '@contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { useTransaction } from '@contexts/TransactionContext';
import { usePathname, useRouter } from 'expo-router';

export default function TabLayout() {
  const { accountId } = useSelector((state: any) => state); // Get wallet state from Redux
  const { theme } = useContext(ThemeContext);
  const { getTransactionOrigin } = useTransaction();
  const pathname = usePathname();
  const router = useRouter();
  const [transactionStatus, setTransactionStatus] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const closeInputModal = () => setIsModalOpen(false);
  const openSuccessModal = () => setIsSuccessModalOpen(true);

  // Define theme-based colors
  const backgroundColor = theme === 'dark' ? '#20252b' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#20252b';
  const inactiveColor = theme === 'dark' ? '#888888' : '#cccccc';

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
    } else {
      // Handle mobile callback
      const handleMobileCallback = () => {
        const url = new URL(window.location.href);
        const transactionHashes = url.searchParams.get('transactionHashes');
        if (transactionHashes) {
          setTransactionStatus('Transaction Successful!');
          closeInputModal();
          openSuccessModal();
        }
      };
      handleMobileCallback();
    }
  }, [pathname, getTransactionOrigin]);

  // If no accountId, redirect to index (login screen)
  useEffect(() => {
    if (!accountId) {
      router.replace('/'); // Redirect to index if not connected
    }
  }, [accountId, router]);

  // If no accountId, return null to avoid rendering tabs until authenticated
  if (!accountId) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor, // Background of the tab bar
            borderBottomColor: backgroundColor, // Avoid unwanted borders
            height: 60, // Increase height for better visibility on mobile
            position: 'absolute', // Ensure tabs are at the top
            top: 0, // Align tabs to the top of the screen
            width: '100%', // Full width of the screen
          },
          tabBarActiveTintColor: textColor, // Color of active tab label/icon
          tabBarInactiveTintColor: inactiveColor, // Color of inactive tab label/icon
          headerShown: false, // Remove the top bar
          tabBarLabelStyle: {
            fontSize: 12, // Ensure label text is readable
            marginTop: 5,
          },
        }}
      >
        <Tabs.Screen name="home" options={{ title: 'Home' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        <Tabs.Screen name="tip" options={{ title: 'Tip' }} />
      </Tabs>
    </SafeAreaView>
  );
}