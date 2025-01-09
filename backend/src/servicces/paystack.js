import axios from 'axios'
import dontenv from 'dotenv';

dontenv.config()

const { AUTH_OPTION = 'Bearer', PAYSTACK_SECRETE } = process.env;
const listBanks = 'https://api.paystack.co/bank'
// const validateAccount = "https://api.paystack.co/decision/validate_account";
const validateAccount = "https://api.paystack.co/bank/resolve";
// const validateAccount = 'https://api.paystack.co/bank/resolve_account';




export const banks = async () => {
    try {
      const response = await axios.get(listBanks, {
        headers: {
          Authorization: `${AUTH_OPTION} ${PAYSTACK_SECRETE}`,
        },
      });
  
      return response.data.data;
    } catch (error) {
      console.log(
        'Error fetching banks:',
        error.response?.data?.message || error.message
      );
      return [];
    }
  };



export const verifyAccount = async (data) => {
  try {
    console.log("data", data, PAYSTACK_SECRETE);
    const response = await axios.get(`${validateAccount}?account_number=${data.accountNumber}&bank_code=${data.bankCode}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRETE}`, 
      },
  });
    const accountData = response.data.data;
    console.log("Account Name:", accountData.account_name);
    console.log("Bank Name:", accountData);
    return accountData
  } catch (error) {
    console.log("Error verifying account:", error);
  }
};