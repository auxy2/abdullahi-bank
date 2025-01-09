import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Component";
import axios from "axios";
import { io } from "socket.io-client";
import "./Dashboard.css";
import tvImage from "../../assets/television.png";
import dataImage from "../../assets/api.png";
import airtimeImage from "../../assets/telephone.png";
import electricityImage from "../../assets/flash.png";
import transferImage from "../../assets/fund.png";
import errorIcon from "../../assets/user.png";
import chatIcon from "../../assets/chat.png";

const UserDashboard = () => {
  const [username, setUsername] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState(""); // New state for account name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTransferFormOpen, setIsTransferFormOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setWalletBalance(user.walletBalance);
        setUsername(user.username);
        setLoading(false);
        setUser(user);
      } else {
        setError("Failed to load dashboard data. Please check your connection or login again.");
        setLoading(false);
      }
    };

    const fetchBanks = async () => {
      try {
        const res = await axios.get("http://localhost:3464/api/banks");
        console.log(res.data.data);
        setBanks(res.data.data);
      } catch (err) {
        console.error("Error fetching bank list:", err);
      }
    };

    const socket = io("http://localhost:3464");
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("notification", (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    fetchUserData();
    fetchBanks();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleBankSelect = async (bankCode) => {
    console.log("bank", bankCode)
    setSelectedBank(bankCode);
    if (accountNumber) {
      try {
        const res = await axios.post("http://localhost:3464/api/account/verify", {
          accountNumber,
          bankCode,
        });
        console.log("Account Name",res.data)
        console.log("res", res.data.data.account_name);
        setAccountName(res.data.data.account_name); // Update account name
      } catch (err) {
        if (err.response?.status === 409) {
          setError("Conflict error: Account verification failed due to mismatch or duplicate request.");
        } else {
          setError("An error occurred while verifying the account. Please try again.");
        }
        setAccountName("");
      }
    }
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
    setAccountName(""); // Reset account name on account number change
  };

  const closeError = () => {
    setError("");
  };

  const toggleTransferForm = () => {
    setIsTransferFormOpen(!isTransferFormOpen);
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {error && (
        <div className="error-modal">
          <div className="error-box">
            <img src={errorIcon} alt="Error" className="error-icon" />
            <p>{error}</p>
            <button onClick={closeError} className="error-close-button">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="user-info">
        <h2>Welcome, {username}</h2>
        <p>Wallet Balance: ₦{walletBalance.toFixed(2)}</p>
        <p>Account Number: {accountNumber}</p>
      </div>

      <div className="actions-container">
        <div className="action-card" onClick={toggleTransferForm}>
          <img src={transferImage} alt="Transfer" />
          <button>Transfer</button>
        </div>
        <div className="action-card">
          <img src={tvImage} alt="TV" />
          <button> TV </button>
        </div>
        <div className="action-card">
          <img src={dataImage} alt="Data" />
          <button> Data </button>
        </div>
        <div className="action-card">
          <img src={airtimeImage} alt="Airtime" />
          <button> Airtime </button>
        </div>
        <div className="action-card">
          <img src={electricityImage} alt="Electricity" />
          <button> Electricity </button>
        </div>
      </div>

      {isTransferFormOpen && (
        <div className="transfer-form">
          <h3>Transfer Funds</h3>
          <button onClick={toggleTransferForm} className="close-transfer-button">X</button>
          <div className="form-group">
            <label>Account Number</label>
            <input
              type="number"
              value={accountNumber}
              placeholder="Account Number"
              onChange={handleAccountNumberChange}
            />
          </div>
          <div className="form-group">
            <label>Select Bank</label>
            <select
              value={selectedBank}
              onChange={(e) => handleBankSelect(e.target.value)}
            >
              <option value="">Select Bank</option>
              {banks.map((bank, index) => (
                <option key={index} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          {/* {accountName && (
            <p className="account-name">Account Name: {accountName}</p>
          )} */}
          {accountName && (
    <div className="account-name-container">
      <p className="account-name">{accountName}</p>
    </div>
  )}
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <button>Submit Transfer</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
