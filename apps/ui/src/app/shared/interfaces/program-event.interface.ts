import { Timestamp } from '@firebase/firestore-types';

export interface ProgramEvent {
  description: string;
  time: Date | Timestamp;
}
