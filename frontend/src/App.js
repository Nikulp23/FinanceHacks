
import './App.css';
import Home from './Home'
import { SelectedItemProvider } from './SelectOption';

function App() {
  return (
    <>
      <SelectedItemProvider>
        <Home />
      </SelectedItemProvider>
    </>
  );
}

export default App;