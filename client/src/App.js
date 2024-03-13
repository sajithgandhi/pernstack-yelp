import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from './routes/HomePage';
import { DetailPage } from './routes/DetailPage';
import { UpdatePage } from './routes/UpdatePage';
import { RestaurantsContextProvider } from './context/RestaurantsContext';

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/:id/update" component={UpdatePage} />
            <Route exact path="/:id" component={DetailPage} />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
