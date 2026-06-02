import { ProtectedLayout } from '@/components/ProtectedLayout';
import { Analytics } from '@/components/Analytics';

export const metadata = {
  title: 'Analytics - Task Manager',
  description: 'View task analytics and insights',
};

export default function AnalyticsPage() {
  return (
    <ProtectedLayout>
      <Analytics />
    </ProtectedLayout>
  );
}
