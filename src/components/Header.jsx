import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineWallet } from "react-icons/hi2";
import { FiArrowUpCircle } from "react-icons/fi";

function Header() {
  const location = useLocation();

  return (
    <header>
      <div className='leftH'>
        <img src='/images/stablepaywordmark.svg' alt='logo' className='logo' />
        <nav>
          <div className='centerItems'>
            <div className='menuSelect'>
              <Link
                to='/'
                className={location.pathname === "/" ? "activeTab" : "tab"}
              >
                <FiArrowUpCircle
                  size={24}
                  color={location.pathname === "/" ? "#008def" : ""}
                />
                Send
              </Link>
            </div>
            <div className='menuSelect'>
              <Link
                to='/balance'
                className={
                  location.pathname === "/balance" ? "activeTab" : "tab"
                }
              >
                <HiOutlineWallet
                  size={25}
                  color={location.pathname === "/balance" ? "#008def" : ""}
                />
                Balances
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className='centerH'></div>

      <div className='rightH'>
        <div className='headerItem'>
          <img src='/images/ethlogo.svg' alt='eth' className='eth' />
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
