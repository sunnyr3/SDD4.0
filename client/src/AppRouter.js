import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import TutorialPage from'./components/MainPage';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route path="/TutorialPage" component={TutorialPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppRouter;