export type FormData = {
  name: string;
  review: string;
  image: File | null;
  error: boolean;
};

export type ReviewType = {
  id: number;
  name: string;
  surname: string;
  photo: string;
  date: Date;
  text: string;
};
