"use client";
import React from "react";
import DashboardPage from "@/components/features/DashboardPage";
import { useSession } from "next-auth/react";
import { Typography } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <div>
      <DashboardPage />
    </div>
  );
};

export default Dashboard;
