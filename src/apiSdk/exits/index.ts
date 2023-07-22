import axios from 'axios';
import queryString from 'query-string';
import { ExitInterface, ExitGetQueryInterface } from 'interfaces/exit';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getExits = async (query?: ExitGetQueryInterface): Promise<PaginatedInterface<ExitInterface>> => {
  const response = await axios.get('/api/exits', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createExit = async (exit: ExitInterface) => {
  const response = await axios.post('/api/exits', exit);
  return response.data;
};

export const updateExitById = async (id: string, exit: ExitInterface) => {
  const response = await axios.put(`/api/exits/${id}`, exit);
  return response.data;
};

export const getExitById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/exits/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteExitById = async (id: string) => {
  const response = await axios.delete(`/api/exits/${id}`);
  return response.data;
};
