

const fieldsValidation = (obj) => {

  const { username, email, password, cf_password } = obj.fields;

  if (obj.checkType === 'signin') {
    if (!email || !password) {
      return { status: false, message: "Please fill in all fields." };
    }
  } else if (obj.checkType === 'register') {
    if (!username || !email || !password || !cf_password) {
      return { status: false, message: "Please fill in all fields." };
    }

    if (password !== cf_password) {
      return { status: false, message: "Passwords do not match." };
    }
  }


  if (password.length < 6) {
    return { status: false, message: "Password must be at least 6 characters long." };
  }

  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    return { status: false, message: "Invalid email format." };
  }

}

export default fieldsValidation;

export const MESSAGE = 'message';
export const RESULT = 'result';
export const ERROR = 'error';
export const SUCCESS = 'success';
export const WARNING = 'warning';
export const INFO = 'info';
export const STATUS = 'status';
