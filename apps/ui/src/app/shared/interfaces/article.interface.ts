import { Timestamp } from '@firebase/firestore-types';

export interface Article {
  id?: string;
  name: string;
  image: string;
  text: string;
  type: string;
  created: Timestamp | Date;
}
