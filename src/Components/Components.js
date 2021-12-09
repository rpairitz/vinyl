import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    withRouter
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
                    <Route exact path="/" component={SearchList}/>
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
