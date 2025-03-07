import { useEffect } from "react";
import { Text, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { useWallet } from "@contexts/WalletContext";

export default function WalletCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setAccountId } = useWallet();

  useEffect(() => {
    const { account_id, all_keys, contract_id } = params;
    console.log("WalletCallback useEffect, params:", JSON.stringify(params, null, 2));
    if (account_id) {
      console.log("User signed in with account:", account_id);
      if (contract_id) console.log("Contract ID from callback:", contract_id);
      setAccountId(account_id as string);
      router.replace("/(tabs)/home");
    } else {
      console.log("No account_id found, redirecting to /");
      router.replace("/");
    }
  }, [params, router, setAccountId]);

  console.log("Rendering WalletCallback");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Processing wallet connection...</Text>
    </View>
  );
}