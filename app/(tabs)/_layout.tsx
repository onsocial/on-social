import { Tabs } from 'expo-router';
import { useWallet } from '@contexts/WalletContext';

export default function TabLayout() {
  const { accountId } = useWallet();

  if (!accountId) {
    return null; // Redirect handled by useEffect in screens
  }

  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="send" options={{ title: 'Send' }} />
    </Tabs>
  );
}
