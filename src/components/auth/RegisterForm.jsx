// src/components/auth/RegisterForm.jsx
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
  FormControl,
  Select,
  FormHelperText,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  InputLabel,
  Chip,
  MenuItem,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  School as SchoolIcon,
  Phone as PhoneIcon,
  FamilyRestroom as FamilyRestroomIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const RegisterForm = ({ onSubmit, isAdmin = false, teacherInvite = null }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [selectedRole, setSelectedRole] = useState(teacherInvite ? 'teacher' : 'student');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [studentIdsInput, setStudentIdsInput] = useState('');
  const [matchedStudents, setMatchedStudents] = useState([]);

  // Dummy student data (replace with API call in production)
  const dummyStudents = [
    { id: 'STU-1001', name: 'John Doe', class: 'Grade 5' },
    { id: 'STU-1002', name: 'Jane Smith', class: 'Grade 6' },
    { id: 'STU-1003', name: 'Mike Johnson', class: 'Grade 4' },
    { id: 'STU-1004', name: 'Sarah Brown', class: 'Grade 7' },
  ];

  // Pre-fill teacher invite data
  useEffect(() => {
    if (teacherInvite) {
      setValue('email', teacherInvite.email);
      setValue('role', 'teacher');
      if (teacherInvite.subjects) {
        setSelectedSubjects(teacherInvite.subjects);
        setValue('subjects', teacherInvite.subjects);
      }
    }
  }, [teacherInvite, setValue]);

  // Load subjects for teacher registration
  useEffect(() => {
    if (selectedRole === 'teacher') {
      setSubjects([
        'Mathematics',
        'English',
        'Science',
        'History',
        'Geography',
        'Computer Science',
        'Physical Education',
      ]);
    }
  }, [selectedRole]);

  // Handle role change
  const handleRoleChange = (event, newRole) => {
    if (newRole !== null && !teacherInvite) {
      setSelectedRole(newRole);
      setStudentIdsInput(''); // Reset student IDs when role changes
      setMatchedStudents([]);
    }
  };

  // Handle student ID input and matching
  const handleStudentIdsChange = (event) => {
    const input = event.target.value;
    setStudentIdsInput(input);

    // Split input by comma or newline, trim whitespace, and filter out empty strings
    const ids = input
      .split(/[\n,]+/)
      .map((id) => id.trim())
      .filter((id) => id);

    // Match IDs with dummy data (replace with API call in production)
    const matched = dummyStudents.filter((student) => ids.includes(student.id));
    setMatchedStudents(matched);
    setValue('studentIds', matched.map((student) => student.id));
  };

  // Handle subject change for teachers
  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSelectedSubjects(value);
    setValue('subjects', value);
  };

  const roleFields = {
    student: (
      <>
        <TextField
          fullWidth
          label="Class"
          variant="outlined"
          margin="normal"
          {...register('class', { required: 'Class is required' })}
          error={!!errors.class}
          helperText={errors.class?.message}
        />
        <TextField
          fullWidth
          label="Section"
          variant="outlined"
          margin="normal"
          {...register('section', { required: 'Section is required' })}
          error={!!errors.section}
          helperText={errors.section?.message}
        />
        <TextField
          fullWidth
          label="Parent Email"
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          {...register('parentEmail', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.parentEmail}
          helperText={errors.parentEmail?.message}
        />
      </>
    ),
    teacher: (
      <>
        {isAdmin && (
          <TextField
            fullWidth
            label="Teacher ID"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolIcon />
                </InputAdornment>
              ),
            }}
            {...register('teacherId', { required: 'Teacher ID is required' })}
            error={!!errors.teacherId}
            helperText={errors.teacherId?.message}
          />
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel>Subjects</InputLabel>
          <Select
            multiple
            value={selectedSubjects}
            onChange={handleSubjectChange}
            label="Subjects"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select subjects this teacher will teach</FormHelperText>
        </FormControl>
        <input type="hidden" {...register('subjects')} />
      </>
    ),
    parent: (
      <>
        <TextField
          fullWidth
          label="Ward(s) Student ID(s)"
          variant="outlined"
          margin="normal"
          multiline
          rows={2}
          value={studentIdsInput}
          onChange={handleStudentIdsChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GroupIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Enter student IDs (e.g., STU-1001, STU-1002)"
          error={!!errors.studentIds}
          helperText={
            errors.studentIds?.message ||
            'Enter each ID separated by comma or on a new line'
          }
        />
        <input
          type="hidden"
          {...register('studentIds', { required: 'At least one student ID is required' })}
        />
        {matchedStudents.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2">Matched Students:</Typography>
            {matchedStudents.map((student) => (
              <Chip
                key={student.id}
                label={`${student.name} (${student.id}) - ${student.class}`}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        )}
        <FormControl fullWidth margin="normal" error={!!errors.relationship}>
          <InputLabel>Relationship</InputLabel>
          <Select
            label="Relationship"
            {...register('relationship', { required: 'Relationship is required' })}
            startAdornment={
              <InputAdornment position="start">
                <FamilyRestroomIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="father">Father</MenuItem>
            <MenuItem value="mother">Mother</MenuItem>
            <MenuItem value="guardian">Guardian</MenuItem>
          </Select>
          {errors.relationship && (
            <FormHelperText>{errors.relationship.message}</FormHelperText>
          )}
        </FormControl>
      </>
    ),
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, maxWidth: 600, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {teacherInvite ? 'Complete Your Teacher Registration' : 'Create an Account'}
        </Typography>

        {!teacherInvite && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Select your role
            </Typography>
            <ToggleButtonGroup
              value={selectedRole}
              exclusive
              onChange={handleRoleChange}
              fullWidth
            >
              <ToggleButton value="student" aria-label="student">
                Student
              </ToggleButton>
              <ToggleButton value="teacher" aria-label="teacher">
                Teacher
              </ToggleButton>
              <ToggleButton value="parent" aria-label="parent">
                Parent/Ward
              </ToggleButton>
            </ToggleButtonGroup>
            <input type="hidden" {...register('role')} value={selectedRole} />
          </Box>
        )}

        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          {...register('name', { required: 'Full name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={!!teacherInvite}
        />

        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
              message: 'Invalid phone number',
            },
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        {roleFields[selectedRole]}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: 'indigo.600', '&:hover': { bgcolor: 'indigo.700' } }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>

        {selectedRole === 'parent' && (
          <Typography variant="caption" color="text.secondary">
            Note: Admins can edit parent-student links after registration.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RegisterForm;