import axios from 'axios';
import type { ProductFormData, Language, TrendAnalysis } from '../types';

const API_URL = 'http://localhost:8000/api';

export async function generateDescription(data: ProductFormData, language: Language) {
  const response = await axios.post(`${API_URL}/generate`, {
    ...data,
    language,
  });
  return response.data;
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function analyzeTrends(brand: string, category: string) {
  const response = await axios.post(`${API_URL}/analyze-trends`, {
    brand,
    category,
  });
  return response.data as TrendAnalysis;
}