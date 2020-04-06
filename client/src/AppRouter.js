import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Webcam from './components/Webcam';
import TutorialPage from'./components/TutorialPage';
import Search from './components/Search';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>

                        <Route exact path="/" component={Webcam} />
                        <Route exact path="/tutorial" component={TutorialPage} />
                        <Route exact path="/search" component={Search} />

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppRouter;