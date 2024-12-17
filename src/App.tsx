import { Routes, Route } from 'react-router-dom';
import AuthGuard from './components/auth/AuthGuard';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import UserDashboard from './pages/UserDashboard';
import AdminPage from './pages/AdminPage';
import ExercisesPage from './pages/ExercisesPage';
import JournalPage from './pages/JournalPage';
import IGICCalculatorPage from './pages/IGICCalculatorPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ChatBot from './components/virtual-teacher/ChatBot';
import { useAuthStore } from './stores/useAuthStore';

export default function App() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/calculator" element={<IGICCalculatorPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
        <ChatBot />
      </div>
    </AuthGuard>
  );
}