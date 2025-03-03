import { useLocalSearchParams } from 'expo-router';

export default function Details() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Details for ID: {id}</Text>
    </View>
  );
}
