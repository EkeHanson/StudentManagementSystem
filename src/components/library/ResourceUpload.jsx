import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Grid,
  IconButton,
  Divider,
  Alert
} from '@mui/material';
import {
  CloudUpload,
  Cancel,
  CheckCircle,
  Description,
  VideoLibrary,
  Image,
  InsertDriveFile
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Dummy categories
const categories = [
  'Textbook',
  'Reference',
  'Lecture Notes',
  'Research Paper',
  'Video Lecture',
  'Audio Resource',
  'Other'
];

// Dummy file types
const fileTypes = [
  { value: 'pdf', label: 'PDF', icon: <PictureAsPdf /> },
  { value: 'epub', label: 'EPUB', icon: <MenuBook /> },
  { value: 'docx', label: 'Word', icon: <Description /> },
  { value: 'mp4', label: 'Video', icon: <VideoLibrary /> },
  { value: 'mp3', label: 'Audio', icon: <Image /> },
  { value: 'other', label: 'Other', icon: <InsertDriveFile /> }
];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ResourceUpload = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [fileType, setFileType] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    setUploadComplete(false);
    
    // Auto-detect file type from the first file
    if (selectedFiles.length > 0) {
      const fileExt = selectedFiles[0].name.split('.').pop().toLowerCase();
      const detectedType = fileTypes.find(type => type.value === fileExt) || 
                          fileTypes.find(type => type.value === 'other');
      setFileType(detectedType.value);
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!title || !category || files.length === 0) {
      setError('Please fill in all required fields and select a file');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleReset = () => {
    setTitle('');
    setAuthor('');
    setDescription('');
    setCategory('');
    setFileType('');
    setTags([]);
    setFiles([]);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadComplete(false);
    setError('');
  };

  const getFileIcon = () => {
    if (files.length === 0) return <InsertDriveFile fontSize="large" />;
    
    const type = fileTypes.find(t => t.value === fileType);
    return type ? type.icon : <InsertDriveFile fontSize="large" />;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upload New Resource
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {uploadComplete && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={handleReset}>
              Upload Another
            </Button>
          }
        >
          Resource uploaded successfully!
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                margin="normal"
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Category *</InputLabel>
                <Select
                  value={category}
                  label="Category *"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>File Type</InputLabel>
                <Select
                  value={fileType}
                  label="File Type"
                  onChange={(e) => setFileType(e.target.value)}
                >
                  {fileTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {type.icon}
                        <span style={{ marginLeft: 8 }}>{type.label}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: 1,
                  p: 4,
                  textAlign: 'center',
                  mb: 2
                }}
              >
                {files.length > 0 ? (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {getFileIcon()}
                      <Typography variant="body1" sx={{ ml: 1 }}>
                        {files[0].name}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => setFiles([])}
                        sx={{ ml: 1 }}
                      >
                        <Cancel fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="caption">
                      {files.length > 1 ? `+ ${files.length - 1} more files` : ''}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <CloudUpload fontSize="large" />
                    <Typography variant="body1" gutterBottom>
                      Drag and drop files here or
                    </Typography>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUpload />}
                    >
                      Select Files
                      <VisuallyHiddenInput 
                        type="file" 
                        onChange={handleFileChange}
                        multiple
                      />
                    </Button>
                  </Box>
                )}
              </Box>
              
              {isUploading && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                  <Typography variant="caption" display="block" textAlign="right">
                    {uploadProgress}%
                  </Typography>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TextField
                  label="Add Tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTagAdd()}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleTagAdd}
                  disabled={!tagInput.trim()}
                >
                  Add
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagDelete(tag)}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handleReset}
              disabled={isUploading}
            >
              Reset
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              startIcon={<CloudUpload />}
              disabled={isUploading || uploadComplete}
            >
              {isUploading ? 'Uploading...' : 'Upload Resource'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ResourceUpload;