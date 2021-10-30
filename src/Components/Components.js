import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

const Components = () => {
    return (
        <Router>
            <Switch>
                <Route path="." />
            </Switch>
        </Router>
    );
}

export default Components;