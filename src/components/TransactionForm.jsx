import { Input } from "antd";
import Button from "./Button";
import { useState } from "react";
import { useAccount, usePrepareContractWrite } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useContractWrite } from "wagmi";
import useDebounce from "../hooks/useDebounce.js";
import ABI from "../abi.json";
import Selection from "./Selection.jsx";

function TransactionForm() {
  const [amount, setAmount] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [selectedContractAddress, setContractAddress] = useState(
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  );
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const isValidEthAddress = /^0x[0-9A-Fa-f]{40}$/i.test(receiverAddress);
  const isValidAmount = Number(amount) > 0;
  const isButtonDisabled = receiverAddress !== "" && !isValidEthAddress;
  const debouncedSendAmount = useDebounce(amount, 500);
  const debouncedReceiver = useDebounce(receiverAddress, 500);

  const options = [
    {
      label: "USDC",
      imageSrc: "/images/usdc.svg",
      contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    {
      label: "USDT",
      imageSrc: "/images/tether.svg",
      contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
    {
      label: "DAI",
      imageSrc: "/images/dai.svg",
      contractAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    },
    {
      label: "FRAX",
      imageSrc: "/images/frax.svg",
      contractAddress: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
    },
    {
      label: "PYUSD",
      imageSrc: "/images/pyusd.svg",
      contractAddress: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
    },
    {
      label: "USDE",
      imageSrc: "/images/usde.svg",
      contractAddress: "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3",
    },
  ];

  const { config } = usePrepareContractWrite({
    address: selectedContractAddress,
    abi: ABI,
    chainId: 1,
    functionName: "transfer",
    args: [debouncedReceiver, debouncedSendAmount],
    enabled: Boolean(debouncedSendAmount),
  });

  const { write } = useContractWrite(config);

  function handleTransaction() {
    write?.();
  }

  return (
    <>
      <Selection
        selectedContractAddress={selectedContractAddress}
        setContractAddress={setContractAddress}
        options={options}
      />
      <div className='formBox'>
        <div className='formInputs'>
          <span className='labels'>Amount to send:</span>
          <Input
            type='number'
            placeholder='Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            status={!isValidAmount && isConnected ? "error" : ""}
          />
          <span className='labels'>Sending to:</span>
          <Input
            type='text'
            placeholder='Receiver'
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
            status={receiverAddress !== "" && !isValidEthAddress ? "error" : ""}
          />

          {receiverAddress !== "" && !isValidEthAddress && (
            <div className='errorMessage'>Invalid Ethereum address format</div>
          )}
          {!isValidAmount && isConnected ? (
            <div className='errorMessage'>
              Insufficient amount to send transaction
            </div>
          ) : (
            ""
          )}
        </div>
        <div className='buttonContainer'>
          {isConnected ? (
            <Button disabled={isButtonDisabled} onClick={handleTransaction}>
              Send Transaction
            </Button>
          ) : (
            <Button onClick={openConnectModal}>Connect Wallet</Button>
          )}
        </div>
      </div>
    </>
  );
}

export default TransactionForm;
