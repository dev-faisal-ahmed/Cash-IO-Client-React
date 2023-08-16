export type UserInfoType = {
  userName: string | null;
  userEmail: string | null;
  imageUrl: string | null;
  login: boolean;
};

export type StoreType = {
  user: UserInfoType;
};
