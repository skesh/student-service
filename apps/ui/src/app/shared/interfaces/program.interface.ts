import { ProgramEvent } from './program-event.interface';
import { Residence } from './residence.interface';

export interface Program {
  id?: string;
  title: string;
  description: string;
  days: number;
  ageFrom: number;
  ageTo: number;
  events: ProgramEvent[];
  smallImage: string;
  country: string;
  type: string;
  isHot: boolean; // Горящая
  forPerson: any[]; // Подходит для
  residence: Residence[]; // Условия проживания
  includes: string[]; // Включено в проживание
  questions: any[]; // Вопросы
  photos: any[]; // Фотоотчеты
  excursions: { week: number; title: string; description: string };
  created: Date;
  updated: Date;
  bigImage: string;
}
