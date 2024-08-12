import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Layout from "./components/Layout";

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "tetherpay",
  projectId: "tetherpay",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          modalSize='compact'
          coolMode
          chains={chains}
          theme={lightTheme({
            fontStack: "system",
            accentColor: "#008def",
          })}
        >
          <Layout />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
