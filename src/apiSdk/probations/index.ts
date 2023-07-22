import axios from 'axios';
import queryString from 'query-string';
import { ProbationInterface, ProbationGetQueryInterface } from 'interfaces/probation';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProbations = async (
  query?: ProbationGetQueryInterface,
): Promise<PaginatedInterface<ProbationInterface>> => {
  const response = await axios.get('/api/probations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createProbation = async (probation: ProbationInterface) => {
  const response = await axios.post('/api/probations', probation);
  return response.data;
};

export const updateProbationById = async (id: string, probation: ProbationInterface) => {
  const response = await axios.put(`/api/probations/${id}`, probation);
  return response.data;
};

export const getProbationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/probations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProbationById = async (id: string) => {
  const response = await axios.delete(`/api/probations/${id}`);
  return response.data;
};
