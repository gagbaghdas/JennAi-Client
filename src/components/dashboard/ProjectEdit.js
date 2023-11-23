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

function EditProject() {

    const navigate = useNavigate();

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
    // Fetch project data and templates using projectId
    // For demo, using static templates data
    setTemplates([
        { id: 1, image: "static/images/gdd-template-1.png" },
        { id: 2, image: "static/images/gdd-template-2.png" },
        { id: 3, image: "static/images/gdd-template-3.png" },
        { id: 4, image: "static/images/gdd-template-4.png" },
        { id: 5, image: "static/images/gdd-template-4.png" },
    ]);

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
              key={template.id}
              onClick={() =>    setProject({...project, templateId: template.id})}
              border={
                template.id === project.template_id ? "3px solid #05a4b6" : "none"
              }
              m={1}
            >
              <img
                src={template.image}
                alt={`Template ${template.id}`}
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
      </Box>
    </Box>
    </Layout>
  );
}

export default EditProject;
