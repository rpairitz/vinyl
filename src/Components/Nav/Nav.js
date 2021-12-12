import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "../../img/vinyl-logo.svg";

export function Nav() {
    return (
        <nav>
            <ul>
                <li><Link to="/">
                    <Logo width="9.018%" height="9.018%"/>
                </Link></li>
                <li><Link to="/project">Project</Link></li>
                <li><Link to="/devplan">Development Plan</Link></li>
                <li><Link to="/demo">Demo</Link></li>
		<li className="menu-item" id="small" fontSize="0.01%">
			Want us to predict what song you were
			conceived to?&#160;<Link to="/prediction">Click here.</Link>
		</li>
            </ul>
        </nav>
    );
}
