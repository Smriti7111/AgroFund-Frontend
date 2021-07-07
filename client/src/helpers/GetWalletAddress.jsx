import getWeb3 from "../getWeb3";
export const getWalletAddress = async () => {
  try {
    let web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    return account;
  } catch (error) {
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
  }
};
