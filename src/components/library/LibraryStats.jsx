import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  LinearProgress,
  IconButton
} from '@mui/material';
import {
  Book,
  People,
  TrendingUp,
  Event,
  BarChart,
  ArrowDropDown,
  ArrowDropUp,
  MoreVert
} from '@mui/icons-material';
import { Chart } from 'react-google-charts';

// Dummy data for statistics
const libraryStats = {
  totalBooks: 12453,
  availableBooks: 8765,
  borrowedBooks: 3688,
  ebooks: 2450,
  activeUsers: 3421,
  newRegistrations: 128,
  overdueBooks: 147,
  popularCategories: [
    { name: 'Fiction', count: 3245 },
    { name: 'Science', count: 2876 },
    { name: 'History', count: 1987 },
    { name: 'Technology', count: 1765 },
    { name: 'Literature', count: 1532 }
  ],
  recentTransactions: [
    { id: 1, user: 'John Smith', book: 'The React Guide', date: '2023-05-15', type: 'Borrow', status: 'Active' },
    { id: 2, user: 'Sarah Johnson', book: 'Advanced Mathematics', date: '2023-05-14', type: 'Return', status: 'Completed' },
    { id: 3, user: 'Michael Brown', book: 'History of Science', date: '2023-05-14', type: 'Borrow', status: 'Active' },
    { id: 4, user: 'Emily Davis', book: 'Python Programming', date: '2023-05-13', type: 'Return', status: 'Completed' },
    { id: 5, user: 'Robert Wilson', book: 'Chemistry Basics', date: '2023-05-12', type: 'Borrow', status: 'Overdue' }
  ],
  monthlyUsage: [
    ['Month', 'Physical', 'Digital'],
    ['Jan', 1250, 876],
    ['Feb', 1320, 912],
    ['Mar', 1480, 1024],
    ['Apr', 1560, 1150],
    ['May', 1620, 1240],
    ['Jun', 1750, 1320]
  ],
  userActivity: [
    ['Hour', 'Visits'],
    ['8AM', 120],
    ['10AM', 320],
    ['12PM', 450],
    ['2PM', 380],
    ['4PM', 280],
    ['6PM', 150]
  ]
};

const LibraryStats = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('monthly');
  const [chartType, setChartType] = useState('bar');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getTrendIcon = (value) => {
    return value > 0 ? (
      <ArrowDropUp color="success" />
    ) : (
      <ArrowDropDown color="error" />
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Library Statistics
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Overview" icon={<BarChart />} />
        <Tab label="Circulation" icon={<Book />} />
        <Tab label="User Activity" icon={<People />} />
        <Tab label="Trends" icon={<TrendingUp />} />
      </Tabs>
      
      {tabValue === 0 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary" gutterBottom>
                      Total Books
                    </Typography>
                    <Book color="primary" />
                  </Box>
                  <Typography variant="h4">{libraryStats.totalBooks.toLocaleString()}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      +12% from last month
                    </Typography>
                    {getTrendIcon(12)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary" gutterBottom>
                      Available Books
                    </Typography>
                    <Book color="success" />
                  </Box>
                  <Typography variant="h4">{libraryStats.availableBooks.toLocaleString()}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {((libraryStats.availableBooks / libraryStats.totalBooks) * 100).toFixed(1)}% of collection
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary" gutterBottom>
                      Active Users
                    </Typography>
                    <People color="info" />
                  </Box>
                  <Typography variant="h4">{libraryStats.activeUsers.toLocaleString()}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      +{libraryStats.newRegistrations} new this month
                    </Typography>
                    {getTrendIcon(libraryStats.newRegistrations)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary" gutterBottom>
                      Digital Resources
                    </Typography>
                    <Event color="warning" />
                  </Box>
                  <Typography variant="h4">{libraryStats.ebooks.toLocaleString()}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      +24% from last quarter
                    </Typography>
                    {getTrendIcon(24)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Popular Categories</Typography>
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </Box>
                  
                  {libraryStats.popularCategories.map((category) => (
                    <Box key={category.name} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>{category.name}</Typography>
                        <Typography>{category.count.toLocaleString()}</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(category.count / libraryStats.popularCategories[0].count) * 100} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Monthly Usage</Typography>
                    <FormControl size="small" sx={{ width: 120 }}>
                      <InputLabel>View</InputLabel>
                      <Select
                        value={chartType}
                        label="View"
                        onChange={(e) => setChartType(e.target.value)}
                      >
                        <MenuItem value="bar">Bar Chart</MenuItem>
                        <MenuItem value="line">Line Chart</MenuItem>
                        <MenuItem value="area">Area Chart</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType={chartType === 'bar' ? 'BarChart' : chartType === 'line' ? 'LineChart' : 'AreaChart'}
                    loader={<div>Loading Chart</div>}
                    data={libraryStats.monthlyUsage}
                    options={{
                      title: 'Physical vs Digital Usage',
                      chartArea: { width: '80%' },
                      hAxis: {
                        title: 'Usage Count',
                        minValue: 0,
                      },
                      vAxis: {
                        title: 'Month',
                      },
                      colors: ['#3f51b5', '#4caf50'],
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      
      {tabValue === 1 && (
        <Box>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Recent Transactions</Typography>
                <FormControl size="small" sx={{ width: 150 }}>
                  <InputLabel>Time Range</InputLabel>
                  <Select
                    value={timeRange}
                    label="Time Range"
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <MenuItem value="daily">Today</MenuItem>
                    <MenuItem value="weekly">This Week</MenuItem>
                    <MenuItem value="monthly">This Month</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Book</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {libraryStats.recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                              {transaction.user.charAt(0)}
                            </Avatar>
                            {transaction.user}
                          </Box>
                        </TableCell>
                        <TableCell>{transaction.book}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.type} 
                            size="small" 
                            color={transaction.type === 'Borrow' ? 'primary' : 'secondary'}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.status} 
                            size="small" 
                            variant={transaction.status === 'Active' ? 'outlined' : 'filled'}
                            color={
                              transaction.status === 'Completed' ? 'success' : 
                              transaction.status === 'Overdue' ? 'error' : 'info'
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}
      
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Activity by Hour
                </Typography>
                <Chart
                  width={'100%'}
                  height={'300px'}
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={libraryStats.userActivity}
                  options={{
                    title: 'Peak Hours',
                    chartArea: { width: '70%' },
                    hAxis: {
                      title: 'Time of Day',
                    },
                    vAxis: {
                      title: 'Visits',
                    },
                    colors: ['#ff9800'],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Demographics
                </Typography>
                <Chart
                  width={'100%'}
                  height={'300px'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['User Type', 'Percentage'],
                    ['Students', 65],
                    ['Faculty', 20],
                    ['Staff', 10],
                    ['Others', 5]
                  ]}
                  options={{
                    title: 'User Distribution',
                    pieHole: 0.4,
                    colors: ['#e91e63', '#2196f3', '#ffc107', '#4caf50'],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {tabValue === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Library Usage Trends
            </Typography>
            <Chart
              width={'100%'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Year', 'Physical', 'Digital'],
                ['2019', 12000, 3500],
                ['2020', 11500, 4500],
                ['2021', 10500, 6500],
                ['2022', 9500, 8500],
                ['2023', 8500, 10500]
              ]}
              options={{
                title: 'Physical vs Digital Trends Over Time',
                curveType: 'function',
                legend: { position: 'bottom' },
                series: {
                  0: { color: '#3f51b5' },
                  1: { color: '#4caf50' },
                },
                vAxis: {
                  title: 'Usage Count'
                },
                hAxis: {
                  title: 'Year'
                }
              }}
            />
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default LibraryStats;