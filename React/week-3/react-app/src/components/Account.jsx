import React from 'react';
import { useSelector } from 'react-redux';

const Account = () => {
  const amount = useSelector((state) => state.amount);

  return (
    <div className="p-4 rounded bg-primary text-white text-center shadow">
      <h2 className="mb-3">Your Bank</h2>
      <h4>Available Balance</h4>
      <h1 className="display-4">${amount}</h1>
    </div>
  );
};

export default Account;
