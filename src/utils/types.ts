export type UserInfoType = {
  name: string | null;
  email: string | null;
  imageUrl: string | null;
  login: boolean;
};

export type StoreType = {
  user: UserInfoType;
};
