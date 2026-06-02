import { ProtectedLayout } from '@/components/ProtectedLayout';
import { Team } from '@/components/Team';

export const metadata = {
  title: 'Team - Task Manager',
  description: 'Manage your team members',
};

export default function TeamPage() {
  return (
    <ProtectedLayout>
      <Team />
    </ProtectedLayout>
  );
}
