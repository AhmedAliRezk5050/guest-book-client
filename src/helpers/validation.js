export const isEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const isValidPassword = (password) => {
  return password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  );
};
export const isValidUsername = (username) => {
  return username.match(
    /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
  );
};

export const validateUser = (userData) => {
  const username = userData.username ? userData.username.trim() : null;

  const email = userData.email ? userData.email.trim() : null;

  const password = userData.password ? userData.password.trim() : null;

  const validationErrors = [];

  if (!username || !email || !password) {
    validationErrors.push('Missing values');
    return validationErrors;
  }

  if (!isValidUsername(username)) {
    validationErrors.push(
      'Please provide a valid username with minimum eight characters. Allowed characters: [ letters numbers . _  ]. No [ . _ ] at the beginning or at the end or followed by each other',
    );
  }
  if (!isEmail(email)) {
    validationErrors.push('Please provide a valid email address');
  }
  if (!isValidPassword(password)) {
    validationErrors.push(
      'Please provide a password with minimum eight characters, at least one uppercase letter, one lowercase letter and one number and one special character',
    );
  }
  return validationErrors;
};

export const protectedTrimString = (value) =>
  value && typeof value === 'string' ? value.trim() : value;
