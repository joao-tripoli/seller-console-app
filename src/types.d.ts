declare type Lead = {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'active' | 'pending' | 'inactive';
};
