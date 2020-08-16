import React, { SFC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { DiagramList } from './pages/DiagramList';
import { SingleDiagram } from './pages/SingleDiagram';

const App: SFC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/diagrams/:diagramId">
          <SingleDiagram />
        </Route>
        <Route path="/">
          <DiagramList />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
