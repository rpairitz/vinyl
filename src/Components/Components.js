import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { Nav } from "./Nav/Nav.js";
import Home from "./Home/Home.js";
import Project from "./Project/Project.js";
import DevPlan from "./DevPlan/DevPlan.js";
import Demo from "./Demo/Demo.js";
import SearchList from "./Home/SearchList.js";

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
                        <SearchList/>
                    <Redirect to="/" />
                    </Route>
                    <Route path="/project" component={Project}/>
                    <Route path="/devplan" component={DevPlan}/>
                    <Route path="/demo">
                        <Demo />
                        <SearchList />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Components;
