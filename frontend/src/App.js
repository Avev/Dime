import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { itemService } from './services/itemService';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const items = await itemService.query();
    console.log('item')
    setItems(items);
  };

  return (
    <div className='App'>
      <h1>Hello from App!</h1>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}

export default App;
