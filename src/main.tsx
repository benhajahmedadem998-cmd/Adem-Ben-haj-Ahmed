import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {PreferencesProvider} from './context/PreferencesContext.tsx';
import {FleetProvider} from './context/FleetContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <PreferencesProvider>
    <FleetProvider>
      <App />
    </FleetProvider>
  </PreferencesProvider>,
);
