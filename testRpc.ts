import { connect, keyStores } from "near-api-js";

async function testRpc() {
  const config = {
    networkId: "mainnet",
    keyStore: new keyStores.InMemoryKeyStore(),
    nodeUrl: "https://rpc.mainnet.fastnear.com",
  };
  const near = await connect(config);
  const response = await near.connection.provider.query({
    request_type: "view_account",
    finality: "final",
    account_id: "veganart.near", // Replace with your account if different
  });
  console.log("RPC response:", response);
}

testRpc().catch(console.error);