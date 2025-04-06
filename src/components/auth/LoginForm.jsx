// src/components/auth/LoginForm.jsx
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
  Link as MuiLink,
} from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400, // Constrain width to ~1/3 of a typical screen
        width: '100%', // Ensure it takes full width up to maxWidth
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        bgcolor: 'white', // Optional: adds a white background for contrast
        p: 3, // Padding inside the form
        borderRadius: 2, // Rounded corners
        boxShadow: 1, // Subtle shadow for elevation
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Email Field */}
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: 'grey.400' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: 'indigo.500' },
              '&.Mui-focused fieldset': { borderColor: 'indigo.500' },
            },
          }}
          placeholder="Email address"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Password Field */}
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: 'grey.400' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: 'indigo.500' },
              '&.Mui-focused fieldset': { borderColor: 'indigo.500' },
            },
          }}
          placeholder="Password"
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
      </Box>

      {/* Remember Me and Forgot Password */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              id="remember-me"
              name="remember-me"
              color="primary"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
            />
          }
          label="Remember me"
          sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
        />

        <MuiLink
          component={Link}
          to="/forgot-password"
          sx={{
            fontSize: '0.875rem',
            color: 'indigo.600',
            '&:hover': { color: 'indigo.500' },
          }}
        >
          Forgot your password?
        </MuiLink>
      </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="contained"
        fullWidth
        sx={{
          py: 1.5,
          bgcolor: 'indigo.600',
          '&:hover': { bgcolor: 'indigo.700' },
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.5)',
          },
          '&:disabled': { opacity: 0.75, cursor: 'not-allowed' },
          textTransform: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </Box>
  );
};

export default LoginForm;