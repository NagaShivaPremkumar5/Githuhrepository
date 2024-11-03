import React, { useEffect, useState } from 'react';

function PurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    
    const storedHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    setPurchaseHistory(storedHistory);
  }, []);

  return (
    <>
      <h2>Purchase History</h2>
      {purchaseHistory.length === 0 ? (
        <p>No purchase history available.</p>
      ) : (
        <ul>
          {purchaseHistory.map((purchase, index) => (
            <li key={index}>
              <hr></hr>
              <p>Date: {purchase.date}</p>
              <p>Items:</p>
              <ul>
                {purchase.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p>Total Amount: ${purchase.total.toFixed(2)}</p>
              <p>Discounted Amount: ${purchase.discountedTotal.toFixed(2)}</p>
              <p>Discount Applied: {purchase.discount}%</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default PurchaseHistory;
