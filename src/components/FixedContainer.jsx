import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Box, CardMedia, CircularProgress, Typography, TextField, Button } from '@mui/material';
import SimpleLineChart from './SimpleLineChart';
import PicSystem from '../img/Picture1.png';
import { getDeviceTimeseriesWithRange } from '../service/thingsboardSerivce';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#141414',
      paper: '#1F1F1F',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

export default function FixedContainer() {
  const [tdsData, setTdsData] = useState([]);
  const [phData, setPhData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAZ21haWwuY29tIiwidXNlcklkIjoiN2U1NGZhNTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiI4NWExMDdkOC00MzQ0LTRjOGMtYTNmYy1lOTY1NTczOTM0N2IiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTcyMTIwNDE3NywiZXhwIjoxNzI0MzU3Nzc3LCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiN2Q4NjM4YTAtMGE2Zi0xMWVlLTkzYmMtNDVmNmVmYzFkMTYyIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.2rOjQ-NnnKFSZKQx0ijgphSkcTpQ7XkXKFCS41-kOyhQTkNBMappNFZ6ktEPevNrWlvQQvqtw8ZK6uGv5YtgIg'; // ใช้ token ของคุณที่นี่
  const deviceId = '465dff50-26dc-11ee-ac56-c5884406cda6';

  const fetchData = async (start, end) => {
    setIsLoading(true);
    setTdsData([]);
    setPhData([]);
    
    const timezoneOffset = 7 * 60 * 60 * 1000;
    const startTs = new Date(`${start}T${startTime}`).getTime() + timezoneOffset;
    const endTs = new Date(`${end}T${endTime}`).getTime() + timezoneOffset;

    try {
      const timeseriesResponse = await getDeviceTimeseriesWithRange(token, deviceId, 'tds,ph', startTs, endTs);
      setTdsData(timeseriesResponse.tds || []);
      setPhData(timeseriesResponse.ph || []);
      console.log(timeseriesResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTdsData([]);
    setPhData([]);
    fetchData(startDate, endDate);
  }, [startDate, endDate, startTime, endTime]);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexDirection: 'column',
            padding: 2,
            backgroundColor: theme.palette.background.default
          }}
        >
          <Typography variant="h4" sx={{ mb: 4 }}>Data Visualization</Typography>
          <Box 
            sx={{ 
              width: '100%', 
              height: '50vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#444',
              borderRadius: 2,
              padding: 3,
              mb: 4
            }}
          >
            {!isLoading && tdsData.length > 0 && phData.length > 0 ? (
              <SimpleLineChart tdsData={tdsData} phData={phData} />
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#333',
              padding: 3,
              borderRadius: 2,
              mb: 4
            }}
          >
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Box sx={{ mr: 2 }}>
                <label style={{ color: '#FFFFFF' }}>
                  Start Date:
                  <input type="date"  value={startDate} onChange={handleStartDateChange} />
                </label>
              </Box>
              <Box sx={{ mr: 2 }}>
                <label style={{ color: '#FFFFFF' }}>
                  Start Time:
                  <input type="time" value={startTime} onChange={handleStartTimeChange} />
                </label>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mr: 2 }}>
                <label style={{ color: '#FFFFFF' }}>
                  End Date:
                  <input type="date" value={endDate} onChange={handleEndDateChange} />
                </label>
              </Box>
              <Box sx={{ mr: 2 }}>
                <label style={{ color: '#FFFFFF' }}>
                  End Time:
                  <input type="time" value={endTime} onChange={handleEndTimeChange} />
                </label>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Box 
          sx={{ 
            width: { xs: '100%', md: '80%' }, 
            height: 'auto', 
            backgroundColor: '#fff', // พื้นหลังสีขาว
            borderRadius: '10px',
            padding: 2
          }}
        >
          <CardMedia
            component="img"
            image={PicSystem}
            alt="System Image"
            sx={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '10px'
            }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
