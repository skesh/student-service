export interface Visa {
  id?: string;
  country: string;
  type: string;
  period: string; // срок пребывания
  registration: string; // срок оформления
  price: number; // стоимость визы
}
