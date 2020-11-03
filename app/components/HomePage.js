import React from 'react';
import NEPines from './NEPines';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const HomePage = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to='/northeastpines'>Pines of the North East</Link>
        </nav>
        <main>
          <h1>What's the Pine?</h1>
          <img src='https://littlevisuals.co/images/the_pines.jpg'></img>
        </main>
        <Switch>
          <Route exact path='/northeastpines' component={NEPines}/>
        </Switch>
      </div>
    </Router>
  )
}

export default HomePage
