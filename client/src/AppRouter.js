import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import Webcam from './components/Webcam';
import TutorialPage from'./components/TutorialPage';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Webcam} />
                        <Route exact path="/tutorial" component={TutorialPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppRouter;