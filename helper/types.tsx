export type TUser = {
  logged: boolean;
  name: string | undefined;
  turn: boolean;
  score: number;
};

// export type TUsers = {
//   name: string;
//   turn: boolean;
// };

export type TUsers = TUser[];
