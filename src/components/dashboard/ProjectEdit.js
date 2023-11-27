import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Layout from "../main/Layout";
import api from "../../api";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function EditProject() {

    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false); // State for confirmation dialog

    const { projectId } = useParams();
    const [project, setProject] = useState({
      name: '',
      brief: '',
      templateId: null
    });
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingBrief, setIsEditingBrief] = useState(false);
    const [templates, setTemplates] = useState([]);
  

  useEffect(() => {
    // Fetch project data
    const fetchProjectData = async () => {
        try {
          const response = await api.get(`/get_project/${projectId}`);
          if (response.status === 200) {
            console.log(response.data)
            setProject({
              name: response.data.project_name,
              brief: response.data.brief || response.data.brief_file_path,
              templateId: response.data.template_id
            });
          } else {
            // Handle non-200 responses
            console.error('Error fetching project data:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
    // Fetch templates data
    const fetchTemplatesData = async () => {
        try {
          const response = await api.get('/templates');
          if (response.status === 200) {
            setTemplates(response.data);
          } else {
            console.error('Error fetching templates:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchProjectData();
      fetchTemplatesData();
    }, [projectId]);

  const handleNameEditToggle = () => {
    setIsEditingName(!isEditingName);
  };

  const handleBriefEditToggle = () => {
    setIsEditingBrief(!isEditingBrief);
  };

  const handleSaveChanges = async () => {
    try {
        const response = await api.put(`/update_project/${projectId}`, {
            project_name: project.name,
            brief: project.brief,
            template_id: project.templateId
            // Include other fields as necessary
        });

        if (response.status === 200) {
            // Navigate back to the dashboard after successful update
            navigate('/dashboard');
        } else {
            console.error('Error updating project:', response.statusText);
            // Optionally, handle non-200 responses
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network errors
    }
};
 // Function to open the delete confirmation dialog
 const handleOpenDeleteDialog = () => {
  setOpenDialog(true);
};

// Function to close the delete confirmation dialog
const handleCloseDialog = () => {
  setOpenDialog(false);
};

// Function to handle project deletion
const handleDeleteProject = async () => {
  try {
      const response = await api.delete(`/delete_project/${projectId}`);
      if (response.status === 200) {
          navigate('/dashboard');
      } else {
          console.error('Error deleting project:', response.statusText);
      }
  } catch (error) {
      console.error('Error:', error);
  }
  setOpenDialog(false);
};

  return (
    <Layout>
    <Box p={3}>
      <Box display="flex" alignItems="center">
        {isEditingName ? (
          <TextField
            value={project.name}
            onChange={ (e) => setProject({...project, name: e.target.value})}
          />
        ) : (
          <>
            <Typography variant="h6">{project.name}</Typography>
            <IconButton onClick={handleNameEditToggle}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Box mt={2} display="flex" alignItems="center">
        {isEditingBrief ? (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={project.brief}
            onChange={(e) => setProject({...project, brief: e.target.value})}
          />
        ) : (
          <>
            <Typography variant="body1">{project.brief}</Typography>
            <IconButton onClick={handleBriefEditToggle}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Template</Typography>
        <Box display="flex" overflow="auto" mt={1}>
          {templates.map((template) => (
            <Box
              key={template._id}
              onClick={() =>    setProject({...project, templateId: template._id})}
              border={
                template._id === project.templateId ? "3px solid #05a4b6" : "none"
              }
              m={1}
            >
              <img
                src={template.image}
                alt={`Template ${template._id}`}
                width={100} // Adjust as needed
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box mt={3}>
        <Button variant="contained" onClick={handleSaveChanges}>
          Save Changes
        </Button>
        <IconButton onClick={handleOpenDeleteDialog} color="secondary">
                        <DeleteIcon />
                    </IconButton>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{"Confirm Deletion"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this project?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleDeleteProject} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
    </Box>
    </Layout>
  );
}

export default EditProject;
