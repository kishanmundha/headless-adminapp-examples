import { SessionResolver } from '@headless-adminapp/app/auth';

export const sessionResolver: SessionResolver = async () => {
  const response = await fetch('/api/sales-hub/me');

  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }

    throw new Error('Failed to fetch user data');
  }

  return await response.json();
};
