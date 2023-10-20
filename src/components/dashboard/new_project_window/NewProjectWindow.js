import React, { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  Button,
  Typography,
  Box,
  Input,
  InputLabel,
  styled,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";

const CustomNewProjectWindow = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),

  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function NewProjectWindow({ open, onClose }) {
  const [projectName, setProjectName] = useState("");
  const [brief, setBrief] = useState("");
  const [briefFile, setBriefFile] = useState(null);
  const [templateFile, setTemplateFile] = useState(null);
  const [templateId, setTemplateId] = useState(0);
  const [step, setStep] = useState(1);
  const [briefFileName, setBriefFileName] = useState("");
  const [templateFileName, setTemplateFileName] = useState("");


  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const formData = new FormData();
      formData.append("project_name", projectName);
      formData.append("brief", brief);
      formData.append("template_id", templateId.toString());
      if (briefFile) {
        formData.append("briefFile", briefFile);
      }
      
      if (templateFile) {
        formData.append("templateFile", templateFile);
      }

      try {
        const apiEndpoint = process.env.REACT_APP_API_BASE_URL + "create_project";
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        const response = await fetch({apiEndpoint}, {
          method: "POST",
          body: formData,
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken,
          },
        });
        
        const data = await response.json();
        
        if (response.ok) {
          onClose(); // Close the dialog if successful
        } else {
          console.error("Error submitting data:", data.message);
          // Handle errors accordingly, maybe show a message to the user
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle network errors
      }
    }
  };

  useEffect(() => {
    if (!open) {
      setProjectName("");
      setBrief("");
      setBriefFile(null);
      setTemplateId(0);
      setStep(1);
    }
  }, [open]);

  const templates = [
    { id: 1, image: "static/images/gdd-template-1.png" },
    { id: 2, image: "static/images/gdd-template-2.png" },
    { id: 3, image: "static/images/gdd-template-3.png" },
    { id: 4, image: "static/images/gdd-template-4.png" },
    { id: 5, image: "static/images/gdd-template-4.png" },
    //...add more templates as needed
  ];

  return (
    <CustomNewProjectWindow
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
       {projectName || "Project Name"} 
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box p={4}>
          {step === 1 && (
            <Box>
              <TextField
                required
                sx={{ width: 350, justifyContent: "center" }}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </Box>
          )}
          {step === 2 && (
            <Box>
              <Typography variant="h6">Brief</Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Type your brief or upload a file"
              />
              <Typography align="center" margin={1}>OR</Typography>
              <Input
                type="file"
                inputProps={{ accept: 'application/pdf' }}
                onChange={(e) => {
                  setBriefFile(e.target.files[0]);
                  setBriefFileName(e.target.files[0] ? e.target.files[0].name : "");
                }}
                endAdornment={<AttachFileIcon />}
              />
            </Box>
          )}
          {step === 3 && (
            <Box>
              <Typography variant="h6">Template</Typography>
              <InputLabel htmlFor="template-select">
                Choose a template
              </InputLabel>
              <Box display="flex" overflow="auto" mt={2}>
                {templates.map((template) => (
                  <Box
                    key={template.id}
                    onClick={() =>
                      setTemplateId(
                        template.id === templateId ? 0 : template.id
                      )
                    }
                    border={
                      template.id === templateId ? "3px solid #05a4b6" : "none"
                    }
                    m={1}
                  >
                    <img
                      src={template.image}
                      alt={`Template ${template.id}`}
                      width={400}
                    />
                  </Box>
                ))}
              </Box>
              <Typography align="center" margin={1}>Or Upload Custom Template</Typography>
              <Input
                type="file"
                inputProps={{ accept: 'application/pdf' }}
                onChange={(e) => {
                  setTemplateId(0);
                  setTemplateFile(e.target.files[0]);
                  setTemplateFileName(e.target.files[0] ? e.target.files[0].name : "");
                }}
                endAdornment={<AttachFileIcon />}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Box mt={3} display="flex" justifyContent="space-between">
          {step > 1 && (
            <Button onClick={() => setStep(step - 1)}>Prev</Button>
          )}
          <Button onClick={handleNext}>{step < 3 ? "Next" : "Create"}</Button>
        </Box>
      </DialogActions>
    </CustomNewProjectWindow>
  );
}

export default NewProjectWindow;
