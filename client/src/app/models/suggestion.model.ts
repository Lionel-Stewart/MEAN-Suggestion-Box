export interface Suggestion {
  title: string;
  author: string;
  description: string;

  _id?: string;
  likes?: number;
  score?: number;
  created?: string;
  dislikes?: number; 
  displayDate?: string;
}