export interface Comment {
  author: string;
  content: string;
  parentId: string;

  _id?: string;
  likes?: number;
  score?: number;
  created?: string;
  dislikes?: number; 
  displayDate?: string;
}