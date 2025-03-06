import { View } from 'react-native';
import WalletConnectButton from '@components/WalletConnectButton';
import ThemeToggle from '@components/ThemeToggle';
import '@styles/global.css';

export default function HomeScreen() {
  console.log('Rendering HomeScreen (login)');
  return (
    <View className="flex-1 items-center justify-center bg-light-background p-5 dark:bg-dark-background">
      <WalletConnectButton />
      <ThemeToggle />
    </View>
  );
}
