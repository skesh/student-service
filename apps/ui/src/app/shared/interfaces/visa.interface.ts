export interface Visa {
  id?: string;
  countryId: string;
  type: string;
  period: string; // срок пребывания
  registration: string; // срок оформления
  price: number; // стоимость визы
}
