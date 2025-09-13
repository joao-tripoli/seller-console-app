import Leads from '@/pages/leads';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Leads,
});
