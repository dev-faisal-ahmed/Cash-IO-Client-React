export type UserInfoType = {
  name: string | null;
  email: string | null;
  imageUrl: string | null;
  login: boolean;
};

export type WalletType = {
  expense: number | 0;
  revenue: number | 0;
  name: string;
};

export type ApiType = {
  wallets: WalletType[];
  transactions: TransactionType[];
};

export type TransactionType = {
  email?: string;
  _id?: string;
  amount: number;
  date: Date;
  category: string;
  type: 'expense' | 'revenue' | 'transfer';
  description?: string;
  wallet: string;
};

export type StoreType = {
  user: UserInfoType;
  api: ApiType;
};

export type ChartType = {
  data: {
    [data: string]: {
      date: string;
      expense: number;
      revenue: number;
    };
  };
};

export type FromType = {
  amount: string;
  description: string;
  category: string;
  type: string;
  date: Date;
  wallet: string;
};

export type WalletMapType = {
  [key: string]: WalletType;
};
