
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/movie/Navbar";
import Footer from "@/components/movie/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthProvider, useAuth } from "@/contexts/AuthContext.jsx";
import { SettingsProvider, useSettings } from "@/contexts/SettingsContext.jsx";

const HomePage = lazy(() => import("./pages/movie/HomePage.jsx"));
const MoviesPage = lazy(() => import("./pages/movie/MoviesPage.jsx"));
const SeriesPage = lazy(() => import("./pages/movie/SeriesPage.jsx"));
const GenresPage = lazy(() => import("./pages/movie/GenresPage.jsx"));
const MovieDetailsPage = lazy(() => import("./pages/movie/MovieDetailsPage.jsx"));
const SearchResultsPage = lazy(() => import("./pages/movie/SearchResultsPage.jsx"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage.jsx"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage.jsx"));
const AdminMoviesPage = lazy(() => import("./pages/admin/AdminMoviesPage.jsx"));
const AdminSeriesPage = lazy(() => import("./pages/admin/AdminSeriesPage.jsx"));
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage.jsx"));
const AdminSettingsPage = lazy(() => import("./pages/admin/AdminSettingsPage.jsx"));
const AdminAdsPage = lazy(() => import("./pages/admin/AdminAdsPage.jsx"));


const LoadingFallback = () => (
  <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-10rem)]">
    <div className="p-8 bg-card rounded-lg shadow-xl text-center">
      <svg className="animate-spin h-12 w-12 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="mt-4 text-lg text-muted-foreground">Cargando...</p>
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};


function AppContent() {
  const { isAdminRoute } = useAuth();
  const { settings } = useSettings();

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground ${isAdminRoute ? 'admin-layout' : ''}`}>
      {!isAdminRoute && <Navbar siteName={settings.siteName} logoUrl={settings.logoUrl} />}
      <ScrollArea className="flex-1" id="main-scroll-area">
        <Suspense fallback={<LoadingFallback />}>
          <main className={`${isAdminRoute ? '' : 'container mx-auto py-8 px-4'}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/series" element={<SeriesPage />} />
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/genres/:genreName" element={<MoviesPage />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
              <Route path="/tv/:id" element={<MovieDetailsPage isSeries={true} />} />
              <Route path="/search" element={<SearchResultsPage />} />
              
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route 
                path="/admin/dashboard" 
                element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} 
              />
              <Route 
                path="/admin/movies" 
                element={<ProtectedRoute><AdminMoviesPage /></ProtectedRoute>} 
              />
               <Route 
                path="/admin/series" 
                element={<ProtectedRoute><AdminSeriesPage /></ProtectedRoute>} 
              />
               <Route 
                path="/admin/users" 
                element={<ProtectedRoute><AdminUsersPage /></ProtectedRoute>} 
              />
               <Route 
                path="/admin/settings" 
                element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} 
              />
              <Route 
                path="/admin/ads" 
                element={<ProtectedRoute><AdminAdsPage /></ProtectedRoute>} 
              />

              <Route path="*" element={<Navigate to="/" replace />} /> 
            </Routes>
          </main>
        </Suspense>
      </ScrollArea>
      {!isAdminRoute && <Footer siteName={settings.siteName} />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SettingsProvider>
          <AppContent />
        </SettingsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
