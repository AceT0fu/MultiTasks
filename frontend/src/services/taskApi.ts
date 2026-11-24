import axios from "axios";
import type { Task } from "../types/Task";

const BASE_URL = "http://localhost:8080/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(BASE_URL);
    return response.data;
};

export const createTask = async (
  title: string,
  description: string
): Promise<Task> => {
  const response = await axios.post<Task>(
    BASE_URL,
    {
      title,
      description,
    }
  );

  return response.data;
};

export const toggleTaskStatus = async (
  id: number
): Promise<Task> => {
  const response = await axios.put<Task>(
    `${BASE_URL}/${id}/toggle`
  );

  return response.data;
};

export const deleteTask = async (
  id: number
): Promise<void> => {
  await axios.delete(
    `${BASE_URL}/${id}`
  );
};