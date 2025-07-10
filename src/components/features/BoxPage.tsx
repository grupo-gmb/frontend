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

const BoxPage = () => {
  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Caixas
        </Typography>
      </Box>
    </Layout>
  );
};

export default BoxPage;
