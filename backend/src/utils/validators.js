export const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const commonPasswords = (password) => {
   const weakPasswords = ['password', '123456', 'qwerty', 'abc123', 'password123'];
   if(weakPasswords.includes(password.toLowerCase())){
      throw new Error("Password is too common and easily guessable");
   }
};

