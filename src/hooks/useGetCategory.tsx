import { serverAddress } from '../utils/serverAddress';
import { useState } from 'react';

export function useGetCategory() {
  const [categories, setCategories] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCategory() {
    const response = await fetch(`${serverAddress}/get-category`).then((res) =>
      res.json(),
    );
    if (response.okay) {
      setIsLoading(false);
      setCategories(response.data);
    }
  }

  return { fetchCategory, categories, isLoading };
}
