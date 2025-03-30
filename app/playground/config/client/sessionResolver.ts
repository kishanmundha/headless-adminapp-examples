import { SessionResolver } from '@headless-adminapp/app/auth';

export const sessionResolver: SessionResolver = async () => {
  const response = await fetch('/api/service-booking/me');

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return await response.json();
};
