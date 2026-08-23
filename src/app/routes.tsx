import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { LandingPage } from '../pages/Landing/LandingPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { NetworkPage } from '../pages/Network/NetworkPage';
import { InventoryPage } from '../pages/Inventory/InventoryPage';
import { RequestsPage } from '../pages/Requests/RequestsPage';
import { ForecastPage } from '../pages/Forecast/ForecastPage';
import { RisksPage } from '../pages/Risks/RisksPage';
import { RecommendationsPage } from '../pages/Recommendations/RecommendationsPage';
import { TransfersPage } from '../pages/Transfers/TransfersPage';
import { ActivityPage } from '../pages/Activity/ActivityPage';
import { PrivacyPage } from '../pages/Privacy/PrivacyPage';
import { TermsPage } from '../pages/Terms/TermsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root / Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Application Shell Routes */}
      <Route path="/app" element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="network" element={<NetworkPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="forecast" element={<ForecastPage />} />
        <Route path="risks" element={<RisksPage />} />
        <Route path="recommendations" element={<RecommendationsPage />} />
        <Route path="transfers" element={<TransfersPage />} />
        <Route path="activity" element={<ActivityPage />} />
      </Route>

      {/* Legal & Compliance Routes */}
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
