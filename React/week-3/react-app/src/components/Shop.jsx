import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';

const Shop = () => {
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.amount);
  const { depositMoney, withdrawMoney } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="p-4 rounded bg-secondary text-white text-center shadow">
      <h2 className="mb-4">Transaction Center</h2>

      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-success mx-2"
          onClick={() => depositMoney(100)}
        >
          Deposit +$100
        </button>

        <button
          className="btn btn-danger mx-2"
          onClick={() => withdrawMoney(100)}
        >
          Withdraw -$100
        </button>
      </div>

      <h4 className="mt-4">Current Balance</h4>
      <h2 className="display-5">${amount}</h2>
    </div>
  );
};

export default Shop;
