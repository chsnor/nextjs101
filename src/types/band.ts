export type Band = {
  id: number;
  bandname: string;
  img: string;
  member: Member[];
};
export type Member = {
  name: string;
  role: string;
  img: string;
};
