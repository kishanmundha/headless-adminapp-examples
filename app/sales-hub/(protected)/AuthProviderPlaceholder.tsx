import { AuthProviderPlaceholderProps } from '@headless-adminapp/app/auth';
import { PageLoading } from '@headless-adminapp/fluent/components/PageLoading';
import { PageBroken } from '@headless-adminapp/fluent/components/PageBroken';
import { FC } from 'react';
import { redirect } from 'next/navigation';

export const AuthProviderPlaceholder: FC<AuthProviderPlaceholderProps> = ({
  loading,
  loadingError,
}) => {
  if (loading) {
    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <PageLoading message="Authenticating..." />
      </div>
    );
  }

  if (loadingError) {
    return <PageBroken title="Error loading auth session" />;
  }

  redirect(
    '/sales-hub/login?next=' + encodeURIComponent(window.location.pathname)
  );
};
