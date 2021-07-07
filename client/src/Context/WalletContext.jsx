import React, { createContext, useState } from "react";

export const walletContext = createContext();

export const WalletProvider = (props) => {
  const [walletAddress, setWalletAddress] = useState(null);

  return (
    <walletContext.Provider value={[walletAddress, setWalletAddress]}>
      {props.children}
    </walletContext.Provider>
  );
};
