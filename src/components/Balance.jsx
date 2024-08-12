/* eslint-disable react/prop-types */
import { ConnectButton } from "@rainbow-me/rainbowkit";
import TokenBalance from "./TokenBalance";

function Balance({ isConnected, address }) {
  const tokens = [
    {
      name: "Tether",
      symbol: "USDT",
      image: "/images/tether.svg",
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      image: "/images/usdc.svg",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    {
      name: "Dai",
      symbol: "DAI",
      image: "/images/dai.svg",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    },
    {
      name: "Frax",
      symbol: "FRAX",
      image: "/images/frax.svg",
      address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
    },
    {
      name: "Pyusd",
      symbol: "PYUSD",
      image: "/images/pyusd.svg",
      address: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
    },
    {
      name: "USDE",
      symbol: "USDE",
      image: "/images/usde.svg",
      address: "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3",
    },
  ];

  return (
    <>
      <div className='balanceHeading'>Your Balances</div>
      <div className='subtext'>View your balance of stablecoins</div>
      <div className='balanceContainer'>
        {!isConnected ? (
          <div className='connectButtonContainer'>
            <ConnectButton />
          </div>
        ) : (
          tokens.map((token) => (
            <TokenBalance
              key={token.symbol}
              token={token}
              image={token.image}
              address={address}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Balance;
