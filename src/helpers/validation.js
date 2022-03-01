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
    /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
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
      'Please provide a valid username with minimum eight characters. Allowed characters: [ letters numbers . _  ]',
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

const protectedTrimString = (value) =>
  value && typeof value === 'string' ? value.trim() : value;
