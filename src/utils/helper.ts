import { TransactionType, WalletMapType, WalletType } from './types';

// this function will create a object with where it's key will be a date and value will be the transaction object
export function getTransactionMap(transactions: TransactionType[]) {
  const transactionsMap: { [key: string]: TransactionType[] } = {};
  for (let i = 0; i < transactions.length; i++) {
    const date = new Date(transactions[i].date);
    const dateString = date.toString().slice(0, 15);
    if (!transactionsMap[dateString]) {
      const newObject = transactions[i];
      transactionsMap[dateString] = [newObject];
    } else {
      transactionsMap[dateString].push(transactions[i]);
    }
  }

  return transactionsMap;
}

// this function will create an object where key will be a date and value will be total expense on that day.
export function getDailyTransactions(
  transactions: TransactionType[],
  range: number,
) {
  const transactionMap = getTransactionMap(transactions);
  const date = new Date();

  /* this is a complex data structure
    weeklyTransactions = {
      2021-01-01: {
        expenses : 200,
        revenues : 100
      }
    }
  */

  const weeklyTransactions: {
    [key: string]: {
      date: string;
      expense: number;
      revenue: number;
    };
  } = {};

  for (let i = 0; i < range; i++) {
    const newDate = date.getTime() - i * 24 * 3600 * 1000;
    const dateString = new Date(newDate).toString().slice(0, 15);
    let expense = 0;
    let revenue = 0;
    if (transactionMap[dateString]) {
      Object.values(transactionMap[dateString]).forEach((transaction) => {
        if (transaction.type === 'expense') expense += transaction.amount;
        else if (transaction.type === 'revenue') revenue += transaction.amount;
      });
    }
    weeklyTransactions[dateString] = {
      expense: 0,
      revenue: 0,
      date: dateString.slice(4, 10),
    };
    weeklyTransactions[dateString].expense = expense | 0;
    weeklyTransactions[dateString].revenue = revenue | 0;
  }
  return weeklyTransactions;
}

export function getWalletName(wallets: WalletType[]) {
  return wallets.map((wallet) => wallet.name);
}

export function getWalletMap(wallets: WalletType[]) {
  const walletsMap: WalletMapType = {};
  const length = wallets.length;
  const keys: string[] = ['All'];
  let revenue = 0;
  let expense = 0;

  for (let i = 0; i < length; i++) {
    walletsMap[wallets[i].name] = wallets[i];
    keys.push(wallets[i].name);
    revenue += wallets[i].revenue;
    expense += wallets[i].expense;
  }

  walletsMap['All'] = {
    name: 'All',
    revenue: revenue,
    expense: expense,
  };

  return { keys, walletsMap };
}
