import React from "react";
import "./Dashboard.css"; // Import the CSS file
import tvIcon from "../../assets/tv.png"; // Replace with actual image paths
import dataIcon from "../../assets/data.png";
import airtimeIcon from "../../assets/airtime.png";
import electricityIcon from "../../assets/electricity.png";
import transferIcon from "../../assets/transfer.png";

const UserDashboard = ({ username, walletBalance }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {username}</h1>
        <p>Wallet Balance: <strong>₦{walletBalance.toLocaleString()}</strong></p>
      </header>

      <div className="dashboard-buttons">
        <h2>Bills Payment</h2>
        <div className="bills-section">
          <div className="bill-item">
            <img src={tvIcon} alt="TV Icon" />
            <button>TV</button>
          </div>
          <div className="bill-item">
            <img src={dataIcon} alt="Data Icon" />
            <button>Data</button>
          </div>
          <div className="bill-item">
            <img src={airtimeIcon} alt="Airtime Icon" />
            <button>Airtime</button>
          </div>
          <div className="bill-item">
            <img src={electricityIcon} alt="Electricity Icon" />
            <button>Electricity</button>
          </div>
        </div>

        <h2>Transfer</h2>
        <div className="transfer-section">
          <div className="bill-item">
            <img src={transferIcon} alt="Transfer Icon" />
            <button>Transfer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
