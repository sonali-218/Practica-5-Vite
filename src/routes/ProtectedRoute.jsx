import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuthStore();

    // mostrar spinner mientras se verifica la autenticación
    if (loading) {
        return <LoadingSpinner />;
    }

    // si no hay usuario, redirigir a login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // si hay usuario, renderizar el componente protegido
    return children;
}