import { useAccount } from "wagmi";
import Balance from "./Balance";
import Header from "./Header";
import TransactionForm from "./TransactionForm";

import Footer from "./Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Layout() {
  const { address, isConnected } = useAccount();

  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<TransactionForm />} />
            <Route
              path='/balance'
              element={<Balance isConnected={isConnected} address={address} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
