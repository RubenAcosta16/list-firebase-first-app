import { useNavigate, Link } from "react-router-dom";

const dashBoardWrapper = ({children}) => {
    return <div>
        <nav>
            <div>Logo</div>
            <Link to="/dashboard">Links</Link>
            <Link to="/dashboard/profile">Profile</Link>
            <Link to="/signout">Sign out</Link>

        </nav>
        <div>{children}</div>
    </div>;
}


export default dashBoardWrapper;