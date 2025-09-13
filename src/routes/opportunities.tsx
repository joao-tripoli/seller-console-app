import Opportunities from '@/pages/opportunities';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/opportunities')({
  component: Opportunities,
});
