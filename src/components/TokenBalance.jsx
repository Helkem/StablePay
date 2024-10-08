/* eslint-disable react/prop-types */
import { useBalance } from "wagmi";

function TokenBalance({ token, address, image }) {
  const { data, isError, isLoading } = useBalance({
    address,
    token: token.address,
  });

  if (isLoading) return <span>Loading Balances...</span>;
  if (isError) return <div>Error fetching {token.name} balance</div>;

  const balance = Number(data?.formatted) || 0;

  return (
    <div className='balanceItem'>
      <div className='balanceRight'>
        <img src={image} className='balanceIcon' />
        <span className='balanceToken'>{token.symbol}</span>
      </div>
      <span className='balanceAmount'>{balance.toLocaleString("en-US")}</span>
    </div>
  );
}

export default TokenBalance;
