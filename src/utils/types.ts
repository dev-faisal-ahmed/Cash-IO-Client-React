export type UserInfoType = {
  name: string | null;
  email: string | null;
  imageUrl: string | null;
  login: boolean;
};

export type ApiType = {
  balance: number;
  expense: number;
  revenue: number;
  transactions: TransactionType[];
};

export type TransactionType = {
  email?: string;
  _id?: string;
  amount: number;
  date: Date;
  category: string;
  type: 'expense' | 'revenue';
  description?: string;
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

export type TransactionModalFormType = {
  amount: string;
  description: string;
  category: string;
  type: string;
  date: Date;
};
