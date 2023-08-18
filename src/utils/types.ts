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
};

export type StoreType = {
  user: UserInfoType;
  api: ApiType;
};
