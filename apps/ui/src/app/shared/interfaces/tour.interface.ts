import { Timestamp } from '@firebase/firestore-types';

export class Tour {
  id?: string;
  programId: string;
  dateStart: Timestamp | Date;
  dateEnd: Timestamp | Date;
  seats: number;
  seatsOccupied: number;
  price: number;
}
