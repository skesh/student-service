import { Timestamp } from '@firebase/firestore-types';

export interface Feedback {
  contact: string;
  name: string;
  type: string;
  created: Date | Timestamp;
}
