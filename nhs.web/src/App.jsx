import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import { AuthProvider } from './authContext';
import RequirementsPage from './requirementsPage';
import StaffPage from './staffPage';
import LoginForm from './loginForm'; // Import your login page

function App() {
    return (
        <Router>
            <AuthProvider>
                <div>
                    <nav>
                        <Link to="/requirement">Requirements</Link>
                        <Link to="/staff">Staff</Link>
                        <Link to="/">Login</Link>
                    </nav>
                    <Routes>
                        <Route path="/requirement" element={<PrivateRoute element={RequirementsPage} />} />
                        <Route path="/staff" element={<PrivateRoute element={StaffPage} />} />
                        <Route path="/" element={<LoginForm />} />
                        {/* other routes */}
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
