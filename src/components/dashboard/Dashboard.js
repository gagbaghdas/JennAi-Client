import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashboardItem from "./DashboardItem";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Layout from "../main/Layout";
import NewProjectWindow from "./new_project_window/NewProjectWindow";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const apiEndpoint = process.env.REACT_APP_API_BASE_URL + "get_projects";
    fetch(apiEndpoint, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setProjects(data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          {projects.map((project, index) => (
            <DashboardItem key={index} title={project.name} />
          ))}
          <DashboardItem
            key="new_game"
            title="Create New Game"
            children={
              <AddCircleOutlineRoundedIcon
                sx={{ width: 100, height: 100, margin: 2, color: "#00dbff" }}
              />
            }
            onClick={() => setIsModalOpen(true)}
          />
        </Grid>
      </Box>
      <NewProjectWindow open={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </Layout>
  );
}
