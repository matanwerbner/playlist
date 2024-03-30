import type { User } from './user';

export type Meeting = {
  title: string;
  description: string;
  location: string;
  time?: string;
  day?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | null;
  adminID: string;
  members: {
    [userId: string]: {
      user: User;
      attending: boolean;
    };
  };
  slug: string;
  dateCreated?: number;
  dateUpdate?: number;
};
