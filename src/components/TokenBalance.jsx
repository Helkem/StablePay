/* eslint-disable react/prop-types */
import { useBalance } from "wagmi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TokenBalance({ token, address, image }) {
  const { data, isError, isLoading } = useBalance({
    address,
    token: token.address,
  });

  if (isLoading) return <Skeleton height={20} width={200} />; // Skeleton loading bar
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
