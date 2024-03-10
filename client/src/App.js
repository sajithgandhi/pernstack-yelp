import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from './routes/HomePage';
import { DetailPage } from './routes/DetailPage';
import { UpdatePage } from './routes/UpdatePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:id/update" component={UpdatePage} />
        <Route exact path="/:id" component={DetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
