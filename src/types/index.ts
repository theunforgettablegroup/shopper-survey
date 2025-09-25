export interface QuestionType {
  id: number;
  text: string;
  answers: string[];
}

export interface Profile {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}
