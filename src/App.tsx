import { Toaster } from './components/ui/sonner';
import Leads from './pages/leads';

function App() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Toaster richColors position="top-right" />
      <Leads />
    </div>
  );
}

export default App;
