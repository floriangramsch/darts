export type TUser = {
  logged: boolean;
  name: string | undefined;
  turn: boolean;
  score: number;
};

export type TUsers = TUser[];

export type TThrow = [string, number[]];
export type TThrows = TThrow[];
