import React from 'react';
import Home from '../components/SideBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Container, Grid, Paper } from '@mui/material';
import pic1 from '../img/scene-with-futuristic-robot-used-construction-industry.jpg'
import pic2 from '../img/futuristic-scene-with-high-tech-robot-used-construction-industry.jpg'
import pic3 from '../img/cyberpunk-warrior-urban-scenery.jpg'

// สไตล์สำหรับ MainContent ให้มีพื้นหลังสีเข้ม
const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  width: '100%',
  margin:'0',
  backgroundColor: '#141414', // พื้นหลังสีดำ
  minHeight: '100vh', // ให้กล่องนี้มีความสูงเต็มจอ
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start', // แสดงเนื้อหาจากด้านบนลงด้านล่าง
}));

// สไตล์สำหรับข้อความต้อนรับ
const WelcomeMessage = styled(Typography)(({ theme }) => ({
  color: '#e5e5e5', // สีขาวเทา
  fontSize: '3rem', // ขนาดฟอนต์ใหญ่
  fontWeight: 'bold', // น้ำหนักฟอนต์หนา
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

// สไตล์สำหรับคำอธิบาย
const Description = styled(Typography)(({ theme }) => ({
  color: '#e5e5e5', // สีขาวเทา
  fontSize: '1.25rem', // ขนาดฟอนต์กลาง
  textAlign: 'center',
  maxWidth: '800px', // กำหนดความกว้างสูงสุดของข้อความเพื่อให้อ่านง่ายขึ้น
  marginBottom: theme.spacing(4),
}));

// สไตล์สำหรับบล็อกเนื้อหา
const ContentBlock = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: '#333', // พื้นหลังสีเทาเข้ม
  color: '#fff', // สีข้อความสีขาว
  height: '100%', // ให้บล็อกเนื้อหามีความสูงเต็มที่
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const HomePage = () => {
  return (
    <>
      <Home />
      <MainContent component="main">
        <WelcomeMessage>
          Welcome to IoT Monitoring System
        </WelcomeMessage>
        <Description>
            This system was created to test IoT devices by Mr. Natchapon Makkunchon.
        </Description>
        <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            {/* บล็อกเนื้อหา */}
            <Grid item xs={12} sm={6} md={4}>
              <ContentBlock>
                <Typography variant="h6" gutterBottom>
                  Devolopment
                </Typography>
                <img src={pic3} alt="Feature 1" style={{ width: '100%', borderRadius: '8px' }} />
              </ContentBlock>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ContentBlock>
                <Typography variant="h6" gutterBottom>
                  Testing
                </Typography>
                <img src={pic2} alt="Feature 2" style={{ width: '100%', borderRadius: '8px' }} />
              </ContentBlock>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ContentBlock>
                <Typography variant="h6" gutterBottom>
                  Proof Of Concept
                </Typography>
                <img src={pic1} alt="Feature 3" style={{ width: '100%', borderRadius: '8px' }} />
              </ContentBlock>
            </Grid>
            {/* เพิ่มบล็อกเนื้อหาเพิ่มเติมได้ที่นี่ */}
          </Grid>
        </Container>
      </MainContent>
    </>
  );
}

export default HomePage;
