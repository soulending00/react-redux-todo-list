import { Toaster } from 'react-hot-toast';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import './index.css';

function App() {
  return (
    <>
      <div className="w-screen max-w-[80%] mx-auto my-10">
        <PageTitle>TODO List</PageTitle>
        <div className="max-w-3xl w-full mx-auto">
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1rem',
            fontWeight: 'bold',
          },
        }}
      />
    </>
  );
}

export default App;
