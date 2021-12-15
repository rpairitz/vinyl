import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "../../img/vinyl-logo.svg";

export function Nav() {
    return (
        <nav>
            <ul className="nav">
                <li className="nav-item logo-container"><Link to="/">
                    <Logo className="logo"/>
                </Link></li>
                <li className="nav-item"><Link className="link" to="/project">Project</Link></li>
                <li className="nav-item"><Link className="link" to="/devplan">Dev Plan</Link></li>
                <li className="nav-item"><Link className="link" to="/demo">Demo</Link></li>
		<li className="nav-item small-nav-item" fontSize="0.01%">
			Want us to predict what song you were
			conceived to?&#160;<Link className="link special-link" to="/prediction">Click here.</Link>
		</li>
            </ul>
        </nav>
    );
}
