import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import SeriesDetailPage from '@/pages/SeriesDetailPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminContentFormPage from '@/pages/AdminContentFormPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import MoviesPage from '@/pages/MoviesPage';
import SeriesPage from '@/pages/SeriesPage';
import SearchPage from '@/pages/SearchPage';
import { AnimatePresence } from 'framer-motion';


function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/series/:id" element={<SeriesDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/content/new" element={<AdminContentFormPage />} />
              <Route path="/admin/content/edit/:id" element={<AdminContentFormPage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback route */}
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;