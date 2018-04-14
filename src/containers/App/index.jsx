import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'components/Home';
import Station from 'containers/Station';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/station/:id" component={Station} />
                <Route component={Home} />
            </Switch>
        );
    }
}

export default App;
