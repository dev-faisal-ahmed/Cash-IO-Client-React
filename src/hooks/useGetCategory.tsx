import { toast } from 'react-hot-toast';
import { serverAddress } from '../utils/serverAddress';
import { useState } from 'react';

export function useGetCategory() {
  const [categories, setCategories] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCategory() {
    try {
      const response = await fetch(`${serverAddress}/get-category`).then(
        (res) => res.json(),
      );
      if (response.okay) {
        setCategories(response.data);
      }
    } catch (err) {
      toast.error(JSON.stringify(err), { duration: 500 });
    }

    setIsLoading(false);
  }

  return { fetchCategory, categories, isLoading };
}
