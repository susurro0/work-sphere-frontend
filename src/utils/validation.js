// utils/validation.js

export const validateLogin = (username, password) => {
    const newErrors = {};
  
    // Validate username
    if (!/^\w+$/.test(username)) {
      newErrors.username = 'Username must be a single word without spaces, whitespace, or special characters.';
    } else if (username.length < 5) {
      newErrors.username = 'Username must be at least 5 characters long.';
    }
  
    // Validate password
    if (!password) {
      newErrors.password = 'Password is required.';
    } else {
      const PW_ERROR = 'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.';
      if (password.length < 8) {
        newErrors.password = PW_ERROR;
      }
      if (!/[A-Z]/.test(password)) {
        newErrors.password = PW_ERROR;
      }
      if (!/[a-z]/.test(password)) {
        newErrors.password = PW_ERROR;
      }
      if (!/[0-9]/.test(password)) {
        newErrors.password = PW_ERROR;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        newErrors.password = PW_ERROR;
      }
    }
  
    return newErrors;
};
  
export const validateSignup = (username, email, password, confirmPassword) => {
    const newErrors = {};
  
    // Validate username
    if (!/^\w+$/.test(username)) {
      newErrors.username = 'Username must be a single word without spaces, whitespace, or special characters.';
    } else if (username.length < 5) {
      newErrors.username = 'Username must be at least 5 characters long.';
    }
  
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'A valid email is required.';
    }
  
    // Validate password
    if (!password) {
      newErrors.password = 'Password is required.';
    } else {
      const PW_ERRORS = [];
      if (password.length < 8) {
        PW_ERRORS.push('Password must be at least 8 characters long.');
      }
      if (!/[A-Z]/.test(password)) {
        PW_ERRORS.push('Password must contain at least one uppercase letter.');
      }
      if (!/[a-z]/.test(password)) {
        PW_ERRORS.push('Password must contain at least one lowercase letter.');
      }
      if (!/[0-9]/.test(password)) {
        PW_ERRORS.push('Password must contain at least one digit.');
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        PW_ERRORS.push('Password must contain at least one special character.');
      }
      if (PW_ERRORS.length > 0) {
        newErrors.password = PW_ERRORS.join(' ');
      }
    }
  
    // Validate confirm password
    if (confirmPassword === '') {
      newErrors.confirmPassword = 'Confirm password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
  
    return newErrors;
};

export const validateGrid = (grid) =>{
  let hasStart = false;
  let hasEnd = false;

  for (let row of grid) {
      for (let cell of row) {
          if (cell === 1) {
              hasStart = true;
          }
          if (cell === 2) {
              hasEnd = true;
          }

          if (hasStart && hasEnd) {
              return [true, true];
          }
      }
  }
  return [hasStart, hasEnd];

}
