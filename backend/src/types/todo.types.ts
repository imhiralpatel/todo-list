export interface Todo {
  Id: number;
  Title: string;
  Description: string | null;
  IsCompleted: boolean;
  CreatedAt: Date;
  UpdatedAt: Date | null;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}
