import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { Nav } from "./Nav/Nav.js";
import Home from "./Home/Home.js";
import Project from "./Project/Project.js";

const Components = () => {
    return (
        <div>
            <Router>
                <Nav />
                <Switch>
                    <Route exact path="/">
                        {/*include Home as a child component instead
                        so it will actually appear*/}
                        <Home />
                    <Redirect to="/" />
                    </Route>
                    <Route path="/project" component={Project}/>
                </Switch>
            </Router>
        </div>
    );
}

export default Components;