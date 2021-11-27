import './App.css';
import ResponsiveAppBar from './cmps/AppHeader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemApp from './views/ItemApp';
import HomePage from './views/HomePage';

function App() {
  return (
    <Router>
      <div className='App'>
        <ResponsiveAppBar />
        <Switch>
          <Route component={ItemApp} path='/item' />
          <Route component={HomePage} path='/' />
        </Switch>
        {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
      </div>
    </Router>
  );
}

export default App;
