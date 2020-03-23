import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import TutorialPage from'./components/Tutorialpage';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route exact path="/TutorialPage" component={TutorialPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppRouter;