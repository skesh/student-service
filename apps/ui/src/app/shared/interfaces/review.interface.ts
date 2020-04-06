export interface Review {
  id?: string;
  programId: string; // id программы для которой оставлен отзыв
  firstname: string;
  lastname: string;
  text: string; // текст отзыва
  photo: string; // коротка ссылка на фото пользователя в firebase
  created: Date;
}
