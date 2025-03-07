import { Tabs } from 'expo-router';
import { useContext } from 'react';
import { useWallet } from '@contexts/WalletContext';
import { ThemeContext } from '@contexts/ThemeContext';

export default function TabLayout() {
  const { accountId } = useWallet();
  const { theme } = useContext(ThemeContext);

  // If no accountId, return null (no tabs will show until authenticated)
  if (!accountId) {
    return null; // Redirect should be handled elsewhere (e.g., useEffect in a screen)
  }

  // Define theme-based colors
  const backgroundColor = theme === 'dark' ? '#20252b' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#20252b';
  const inactiveColor = theme === 'dark' ? '#888888' : '#cccccc';

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor, // Background of the tab bar
          borderTopColor: backgroundColor, // Avoid unwanted borders
          height: 60, // Ensure sufficient height for visibility
          paddingBottom: 5, // Add padding for better touch area
        },
        tabBarActiveTintColor: textColor, // Color of active tab label/icon
        tabBarInactiveTintColor: inactiveColor, // Color of inactive tab label/icon
        headerStyle: {
          backgroundColor, // Header background
        },
        headerTintColor: textColor, // Header text/icon color
        tabBarLabelStyle: {
          fontSize: 12, // Ensure label text is readable
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="tip" options={{ title: 'Tip' }} />
    </Tabs>
  );
}