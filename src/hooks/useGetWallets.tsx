import { useDispatch, useSelector } from 'react-redux';
import { serverAddress } from '../utils/serverAddress';
import { updateWallets } from '../utils/stores/apiReducer';
import { StoreType } from '../utils/types';
import { useState } from 'react';

export function useGetWallets(email: string) {
  const disPatch = useDispatch();
  const { wallets } = useSelector((store: StoreType) => store.api);
  const [loading, setLoading] = useState<boolean>(true);

  function fetchWallets() {
    fetch(`${serverAddress}/get-wallet/${email}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) disPatch(updateWallets({ wallets: res.data }));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return { fetchWallets, wallets, loading };
}
