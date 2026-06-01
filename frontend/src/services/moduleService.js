import { apiFetch, authHeader } from './api';

export const getModules = async () => {
  return apiFetch('/modules', {
    headers: authHeader(),
  });
};

export const getModuleById = async (moduleId) => {
  return apiFetch(`/modules/${moduleId}`, {
    headers: authHeader(),
  });
};

export const getModulePage = async (moduleId, pageNumber) => {
  return apiFetch(`/modules/${moduleId}/pages/${pageNumber}`, {
    headers: authHeader(),
  });
};

export const updateModuleProgress = async (moduleId, lastPage) => {
  return apiFetch(`/modules/${moduleId}/progress`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify({ lastPage }),
  });
};