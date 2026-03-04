export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export interface todoPayload {
  title: string;
  description: string;
  completed: boolean;
}

