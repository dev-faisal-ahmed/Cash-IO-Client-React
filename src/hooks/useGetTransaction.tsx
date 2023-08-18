import { useState } from 'react';
import { serverAddress } from '../utils/serverAddress';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransactions } from '../utils/stores/apiReducer';
import { StoreType } from '../utils/types';

export function useGetTransaction(email: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { transactions } = useSelector((state: StoreType) => state.api);

  function fetchTransactions() {
    fetch(`${serverAddress}/get-transaction/${email}`)
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        if (res.okay) {
          dispatch(updateTransactions({ transactions: res.data }));
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setIsLoading(false);
      });
  }

  return { transactions, fetchTransactions, isLoading, error };
}
