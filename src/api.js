import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

export async function getAppliances() {
  const { data } = await api.get('/appliances');
  return data;
}

export async function createAppliance(appliance) {
  const { data } = await api.post('/appliances', appliance);
  return data;
}

export async function updateAppliance(id, appliance) {
  const { data } = await api.put(`/appliances/${id}`, appliance);
  return data;
}

export async function deleteAppliance(id) {
  await api.delete(`/appliances/${id}`);
}
