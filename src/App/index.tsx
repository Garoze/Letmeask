import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { Home } from 'pages/Home';
import { Room } from 'pages/Room';
import { AdminRoom } from 'pages/AdminRoom';
import { CreateRoom } from 'pages/CreateRoom';

import { AuthContextProvider } from 'contexts/AuthContext';

import './styles.scss';

const App = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/create" component={CreateRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
      </Switch>
    </AuthContextProvider>
  </BrowserRouter>
);

export default App;
