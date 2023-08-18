import { useState } from 'react';
import { serverAddress } from '../utils/serverAddress';
import { useDispatch, useSelector } from 'react-redux';
import { updateSummary } from '../utils/stores/apiReducer';
import { StoreType } from '../utils/types';

export function useGetSummary(email: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { balance, expense, revenue } = useSelector(
    (state: StoreType) => state.api,
  );

  function fetchSummary() {
    fetch(`${serverAddress}/user-summary/${email}`)
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        if (res.okay) {
          const { balance, expense, revenue } = res.data;
          dispatch(updateSummary({ balance, expense, revenue }));
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }

  return { isLoading, isError, balance, expense, revenue, fetchSummary };
}
