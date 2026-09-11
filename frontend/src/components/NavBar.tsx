import { Link, useNavigate } from 'react-router-dom'
import '../style/navbar.css'

function NavBar() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className='navbar'>
            <div className='logo'>
                To Do App
            </div>
            <ul className='nav-links'>
                {
                    user ?
                        (
                            <>
                                <li>
                                    <Link to="/">List</Link>
                                </li>
                                <li>
                                    <Link to="/add">Add Task</Link>
                                </li>
                                <li>
                                    Welcome, {user.name}
                                </li>
                                <button onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        )
                        :
                        (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Signup</Link>
                                </li>
                            </>
                        )
                }

            </ul>
        </nav>
    )
}

export default NavBar;