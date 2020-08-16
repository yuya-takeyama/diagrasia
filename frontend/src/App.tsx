import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import './App.css';
import { DiagramList } from './pages/DiagramList';
import { SingleDiagram } from './pages/SingleDiagram';

const App = () => {
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
