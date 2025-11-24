import '../styles/pageHeader.scss';
import { Link, useLocation } from 'react-router-dom';

export default function PageHeader() {
    const location = useLocation();
    // console.log("Current location:", location.pathname);
    const links = [
        { to: '/', label: 'Home' },
        { to: '/problems', label: 'Problems' },
        { to: '/courses', label: 'Courses' },
        { to: '/todo', label: 'Todo List' },
    ];
    return (
        <header className="page-header">
            <Link className='logo' to="/">EverLearning-Admin</Link>
            {/* {
                links.map((link) => (
                    <Link key={link.to} className={`nav-link ${link.to == location.pathname ? 'active' : ''}`} to={link.to}>{link.label}</Link>
                ))
            } */}
            <Link className='login fs-1' to="/login">Sign In/ Sign Up</Link>
        </header>
    );
}