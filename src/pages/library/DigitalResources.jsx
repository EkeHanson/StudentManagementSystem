import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
  Chip,
  Pagination,
  Box,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  PictureAsPdf as PdfIcon,
  MenuBook as EbookIcon,
  VideoLibrary as VideoIcon,
  Audiotrack as AudioIcon,
  GetApp as DownloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Public as WebIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Initial dummy data
const initialResources = [
  {
    id: 1,
    title: "JavaScript: The Definitive Guide",
    type: "ebook",
    format: "EPUB",
    category: "Programming",
    size: "4.2 MB",
    uploadDate: "2023-05-15"
  },
  {
    id: 2,
    title: "React Hooks Tutorial",
    type: "video",
    format: "MP4",
    category: "Web Development",
    size: "156 MB",
    uploadDate: "2023-06-22"
  },
  {
    id: 3,
    title: "Advanced CSS Techniques",
    type: "pdf",
    format: "PDF",
    category: "Web Design",
    size: "8.7 MB",
    uploadDate: "2023-04-10"
  },
  {
    id: 4,
    title: "Python Data Science Handbook",
    type: "ebook",
    format: "PDF",
    category: "Data Science",
    size: "12.4 MB",
    uploadDate: "2023-07-05"
  },
  {
    id: 5,
    title: "Machine Learning Podcast Series",
    type: "audio",
    format: "MP3",
    category: "Artificial Intelligence",
    size: "45.3 MB",
    uploadDate: "2023-03-18"
  },
  {
    id: 6,
    title: "Web Development Reference",
    type: "website",
    format: "URL",
    category: "Web Development",
    size: "-",
    uploadDate: "2023-08-12"
  }
];

const getResourceIcon = (type) => {
  switch (type) {
    case 'pdf': return <PdfIcon />;
    case 'ebook': return <EbookIcon />;
    case 'video': return <VideoIcon />;
    case 'audio': return <AudioIcon />;
    case 'website': return <WebIcon />;
    default: return <EbookIcon />;
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'pdf': return 'error';
    case 'ebook': return 'primary';
    case 'video': return 'secondary';
    case 'audio': return 'info';
    case 'website': return 'success';
    default: return 'default';
  }
};

const DigitalResources = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const rowsPerPage = 5;

  // Initialize with dummy data
  useEffect(() => {
    setTimeout(() => {
      setResources(initialResources);
    }, 500);
  }, []);

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDownload = (resource) => {
    // Simulate download
    console.log(`Downloading: ${resource.title}`);
    alert(`Downloading: ${resource.title}`);
  };

  const handleEdit = (resource) => {
    setCurrentResource(resource);
    setOpenDialog(true);
  };

  const handleDeleteClick = (resource) => {
    setResourceToDelete(resource);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    setResources(resources.filter(r => r.id !== resourceToDelete.id));
    setDeleteConfirmOpen(false);
    setResourceToDelete(null);
  };

  const handleAddNew = () => {
    setCurrentResource({
      id: 0,
      title: '',
      type: 'ebook',
      format: '',
      category: '',
      size: '',
      uploadDate: new Date().toISOString().split('T')[0]
    });
    setOpenDialog(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileToUpload(file);
      // Auto-fill some fields based on file
      const fileName = file.name;
      const fileExt = fileName.split('.').pop().toLowerCase();
      
      let type = 'ebook';
      let format = fileExt.toUpperCase();
      
      if (['mp4', 'mov', 'avi'].includes(fileExt)) {
        type = 'video';
      } else if (['mp3', 'wav'].includes(fileExt)) {
        type = 'audio';
      } else if (['pdf'].includes(fileExt)) {
        type = 'pdf';
      }
      
      setCurrentResource(prev => ({
        ...prev,
        title: fileName,
        type,
        format,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      }));
    }
  };

  const handleSubmit = () => {
    if (currentResource.id === 0) {
      // Add new resource
      const newId = Math.max(...resources.map(r => r.id), 0) + 1;
      const newResource = {
        ...currentResource,
        id: newId,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setResources([...resources, newResource]);
    } else {
      // Update existing resource
      setResources(resources.map(r => 
        r.id === currentResource.id ? currentResource : r
      ));
    }
    setOpenDialog(false);
    setCurrentResource(null);
    setFileToUpload(null);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Digital Resources
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search resources by title or category"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddNew}
                  >
                    Upload Resource
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <List>
                {filteredResources
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((resource) => (
                    <React.Fragment key={resource.id}>
                      <ListItem
                        secondaryAction={
                          <Box>
                            <IconButton 
                              edge="end" 
                              aria-label="download" 
                              color="primary"
                              onClick={() => handleDownload(resource)}
                            >
                              <DownloadIcon />
                            </IconButton>
                            <IconButton 
                              edge="end" 
                              aria-label="edit"
                              onClick={() => handleEdit(resource)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              edge="end" 
                              aria-label="delete" 
                              color="error"
                              onClick={() => handleDeleteClick(resource)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: `${getTypeColor(resource.type)}.light` }}>
                            {getResourceIcon(resource.type)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={resource.title}
                          secondary={
                            <>
                              <Chip 
                                label={resource.category} 
                                size="small" 
                                sx={{ mr: 1 }} 
                              />
                              {resource.format} • {resource.size} • Uploaded: {resource.uploadDate}
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
              </List>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={Math.ceil(filteredResources.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentResource?.id === 0 ? 'Upload New Resource' : 'Edit Resource'}
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={currentResource?.title || ''}
                onChange={(e) => setCurrentResource({...currentResource, title: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={currentResource?.type || 'ebook'}
                  label="Type"
                  onChange={(e) => setCurrentResource({...currentResource, type: e.target.value})}
                >
                  <MenuItem value="ebook">E-Book</MenuItem>
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="audio">Audio</MenuItem>
                  <MenuItem value="website">Website</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Format"
                value={currentResource?.format || ''}
                onChange={(e) => setCurrentResource({...currentResource, format: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category"
                value={currentResource?.category || ''}
                onChange={(e) => setCurrentResource({...currentResource, category: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Size"
                value={currentResource?.size || ''}
                onChange={(e) => setCurrentResource({...currentResource, size: e.target.value})}
                disabled
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 1 }}
              >
                {fileToUpload ? fileToUpload.name : 'Select File'}
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {currentResource?.id === 0 ? 'Upload' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{resourceToDelete?.title}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DigitalResources;