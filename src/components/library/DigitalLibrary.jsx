import React, { useState, useEffect } from 'react';
import { 
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Box,
  Chip,
  Pagination
} from '@mui/material';
import { Search, Book, VideoLibrary, PictureAsPdf, MenuBook } from '@mui/icons-material';

// Dummy data for digital resources
const digitalResources = [
  {
    id: 1,
    title: 'Introduction to React',
    author: 'Jane Smith',
    type: 'ebook',
    format: 'PDF',
    thumbnail: '/images/react-book.jpg',
    category: 'Programming',
    publishDate: '2023-01-15',
    pages: 320,
    rating: 4.5
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    author: 'Dr. Robert Johnson',
    type: 'ebook',
    format: 'EPUB',
    thumbnail: '/images/math-book.jpg',
    category: 'Mathematics',
    publishDate: '2022-11-20',
    pages: 450,
    rating: 4.2
  },
  {
    id: 3,
    title: 'Chemistry Lab Tutorials',
    author: 'Prof. Emily Chen',
    type: 'video',
    format: 'MP4',
    thumbnail: '/images/chem-video.jpg',
    category: 'Science',
    duration: '45 min',
    publishDate: '2023-03-10'
  },
  {
    id: 4,
    title: 'History of Ancient Civilizations',
    author: 'Dr. Michael Brown',
    type: 'ebook',
    format: 'PDF',
    thumbnail: '/images/history-book.jpg',
    category: 'History',
    publishDate: '2023-02-05',
    pages: 280,
    rating: 4.7
  },
  {
    id: 5,
    title: 'Physics Concepts Explained',
    author: 'Prof. Sarah Wilson',
    type: 'video',
    format: 'MP4',
    thumbnail: '/images/physics-video.jpg',
    category: 'Science',
    duration: '1h 20min',
    publishDate: '2023-04-18'
  },
  {
    id: 6,
    title: 'Literature Analysis Guide',
    author: 'Dr. James Miller',
    type: 'ebook',
    format: 'EPUB',
    thumbnail: '/images/literature-book.jpg',
    category: 'Literature',
    publishDate: '2023-01-30',
    pages: 210,
    rating: 4.3
  }
];

const categories = ['All', 'Programming', 'Mathematics', 'Science', 'History', 'Literature'];

const DigitalLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const filteredResources = digitalResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = tabValue === 0 || 
                       (tabValue === 1 && resource.type === 'ebook') || 
                       (tabValue === 2 && resource.type === 'video');
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const paginatedResources = filteredResources.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getTypeIcon = (type) => {
    switch(type) {
      case 'ebook': return <Book color="primary" />;
      case 'video': return <VideoLibrary color="secondary" />;
      default: return <MenuBook />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Digital Library
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: '40%' }}
        />
        
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Resources" />
          <Tab label="eBooks" icon={<Book />} />
          <Tab label="Videos" icon={<VideoLibrary />} />
        </Tabs>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        {categories.map(category => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleCategoryChange(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
      
      <Grid container spacing={3}>
        {paginatedResources.length > 0 ? (
          paginatedResources.map(resource => (
            <Grid item xs={12} sm={6} md={3} key={resource.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={resource.thumbnail}
                    alt={resource.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {resource.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {resource.author}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {getTypeIcon(resource.type)}
                      <Typography variant="caption" sx={{ ml: 1 }}>
                        {resource.type === 'ebook' ? `${resource.pages} pages` : resource.duration}
                      </Typography>
                    </Box>
                    <Chip 
                      label={resource.category} 
                      size="small" 
                      sx={{ mt: 1 }} 
                    />
                    {resource.rating && (
                      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                        Rating: {resource.rating}/5
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" sx={{ p: 4 }}>
              No resources found matching your criteria.
            </Typography>
          </Grid>
        )}
      </Grid>
      
      {filteredResources.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredResources.length / itemsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default DigitalLibrary;