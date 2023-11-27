import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import RequirementsPage from './requirementsPage';
import StaffPage from './staffPage';
import LoginForm from './loginForm'; 
function App() {
    return (
        <Router>
            <AuthProvider>
                <div>
                    <nav>
                        <Link to="/login">Login</Link>
                        <Link to="/requirement">Requirements</Link>
                        <Link to="/staff">Staff</Link>
                    </nav>
                    <Routes>
                        <Route path="/requirement" element={<PrivateRoute element={RequirementsPage} />} />
                        <Route path="/staff" element={<PrivateRoute element={StaffPage} />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
