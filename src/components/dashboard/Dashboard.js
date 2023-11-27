import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashboardItem from "./DashboardItem";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Layout from "../main/Layout";
import NewProjectWindow from "./new_project_window/NewProjectWindow";
import api from '../../api';

export default function Dashboard() {
  console.log("rendering dashboard")
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function fetchProjects() {
    console.log("fetching projects")
    api.get("get_projects")
    .then(response => {
      console.log(response)
      if (response.status !== 200) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.data
    })
    .then(data => {
      setProjects(data);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          {projects.map((project, index) => (
            <DashboardItem itemKey= {project._id} title={project.project_name} onProjectDelete={fetchProjects}/>
          ))}
          <DashboardItem
            itemKey="new_game"
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
      <NewProjectWindow open={isModalOpen} onClose={() => {setIsModalOpen(false); fetchProjects();}} />

    </Layout>
  );
}
