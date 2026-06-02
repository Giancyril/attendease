import { ProtectedLayout } from '@/components/ProtectedLayout';
import { Dashboard } from '@/components/Dashboard';

export const metadata = {
  title: 'Dashboard - Task Manager',
  description: 'Manage your tasks efficiently',
};

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <Dashboard />
    </ProtectedLayout>
  );
}
