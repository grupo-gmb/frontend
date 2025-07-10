import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import Layout from "@/components/layout/_Layout";

const ReportPage = () => {
  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Relatórios
        </Typography>
      </Box>
    </Layout>
  );
};

export default ReportPage;
