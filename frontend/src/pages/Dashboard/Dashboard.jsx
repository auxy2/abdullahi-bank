import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import tvImage from "../../assets/television.png";
import dataImage from "../../assets/api.png";
import airtimeImage from "../../assets/telephone.png";
import electricityImage from "../../assets/flash.png";
import transferImage from '../../assets/fund.png';
import errorIcon from "../../assets/user.png";
import chatIcon from "../../assets/chat.png";

const UserDashboard = () => {
  const [username, setUsername] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTransferFormOpen, setIsTransferFormOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Fetch user data and wallet info
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/dashboard");
        const { username, walletBalance, accountNumber } = res.data;
        setUsername(username);
        setWalletBalance(walletBalance);
        setAccountNumber(accountNumber);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load dashboard data. Please check your connection.");
        setLoading(false);
      }
    };

    // Fetch available banks for transfer
    const fetchBanks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/banks");
        setBanks(res.data); // Assuming the API returns an array of bank names
      } catch (err) {
        console.error("Error fetching bank list:", err);
      }
    };

    fetchUserData();
    fetchBanks();
  }, []);

  const closeError = () => {
    setError("");
  };

  const toggleTransferForm = () => {
    setIsTransferFormOpen(!isTransferFormOpen);
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  const handleTransferSubmit = async () => {
    if (!selectedBank || !transferAmount || isNaN(transferAmount) || transferAmount <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/transfer", {
        bank: selectedBank,
        accountNumber,
        amount: transferAmount,
      });
      alert("Transfer Successful");
      setTransferAmount(""); // Clear the amount field
      setSelectedBank(""); // Clear the selected bank
      toggleTransferForm(); // Close the transfer form
    } catch (err) {
      console.error("Transfer error:", err);
      alert("Error during transfer. Please try again.");
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
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
        {/* Transfer Action Card */}
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

      {/* Transfer Form */}
      {isTransferFormOpen && (
        <div className="transfer-form">
          <h3>Transfer Funds</h3>
          <button onClick={toggleTransferForm} className="close-transfer-button">X</button>
          <div className="form-group">
            <label>Account Number</label>
            <input
              type="number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Account Number"
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
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            {selectedBank && <p>Selected Bank: {selectedBank}</p>}
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <button onClick={handleTransferSubmit}>Submit Transfer</button>
        </div>
      )}

      {/* Chat Icon */}
      <div className="chat-icon-container">
        <img 
          src={chatIcon} 
          alt="Chat" 
          className="chat-icon" 
          onClick={toggleChat} 
        />
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chat</h4>
            <button onClick={toggleChat} className="close-chat-button">X</button>
          </div>
          <div className="chat-messages">
            <p>Welcome to the chat!</p>
            {/* Add more chat messages here */}
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
