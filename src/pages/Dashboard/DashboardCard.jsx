import React from 'react';
import AllUser from '../User/AllUser';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import CountUp from "react-countup";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";


const classes = {
  dashboardcard: {
    // padding: theme.spacing(2),
  },
  cardBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    maxWidth: "50px",
    height: "100%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  countUpBox: {
    display: "flex",
    justifyContent: "start",
    gap: "5px",
    alignItems: "center",
  },
  cardTypography: {
    fontWeight: 700,
    fontSize: "17px",
    // width: '150px',
    "@media(max-width(600))": {
      width: "auto",
    },
  },
  pieChart: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // height: "300px",
  },
  graphCard: {
    maxWidth: "auto",
    height: "450px",
  },
};

const DashboardCard = () => {

  const cardData = [
    {

      end: 15,
      color: "#78A75A",
      title: "All Users",
    },
    {
      end: 20,
      color: "#EA33F7",
      title: "All Musics",
    },
    {

      end: 70,
      color: "#2854C5",
      title: "Total HashTags",
    },
    { end: 89, color: "#BB271A", title: "All Funs" },
    { end: 56, color: "#8C1AF6", title: "All Sports" },
  ];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Progress",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Monthly Progress",
        data: [65, 59, 80, 81, 56, 55, 20],
        backgroundColor: 'rgb(255, 99, 132, 0.6)',
        borderColor: 'rgb(255, 99, 132,1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
  };
  const pieData = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
 
  return (
    <>
      <Grid container spacing={2}>
        {cardData.map((item, index) => (
          <Grid item lg={2.4} md={2.4} sm={4} xs={12} key={index}>
            <Card className={classes.card} sx={{display:'flex',width:'200px'}}>
              <CardContent>
                <Box className={classes.countUpBox}>
                  {/* <img src={item.img} alt="logo" height={50} width={50} /> */}
                  <CountUp
                    start={0}
                    end={item.end}
                    delay={0}
                    style={{
                      fontWeight: "700",
                      color: item.color,
                      fontSize: "25px",
                    }}
                  />
                </Box>
                <Box mt="8px">
                  <Typography
                    gutterBottom
                    variant="p"
                    component="div"
                    className={classes.cardTypography}
                    sx={{
                      fontWeight: "700",
                      color: item.color,
                      fontSize: "20px",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} mt="1rem">
        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.mobCard}>
          <Card className={classes.graphCard}>
            <CardContent>
              <Typography variant="h6" style={{ color: "grey" }}>
                Statistics
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  color: "black",
                  fontWeight: "700",
                  fontSize: "25px",
                }}
              >
                Users Report
              </Typography>
              <Box className={classes.pieChart}>
                <Bar data={data} options={options} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Card className={classes.graphCard}>
            <CardContent>
              <Typography variant="h6" style={{ color: "grey" }}>
                Statistics
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  color: "black",
                  fontWeight: "700",
                  fontSize: "25px",
                }}
              >
                Categories Report
              </Typography>
              <Box className={classes.pieChart} sx={{
                height: '290px', display: "grid",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}>
                <Doughnut data={pieData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default DashboardCard;