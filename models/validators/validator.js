module.exports = {
  userNameValidator: {
    validator: function (u) {
      const userNameRegex = /[^a-zA-Z0-9]/;
      return !userNameRegex.test(u);
    },
    message:"Username cannot contain special chars"
  },
  emailValidator: {
      validator:function (e) {
          let ext=e.split("@")
          ext=ext[ext.length-1]
          return ext==="mavs.uta.edu"
      },
      message:"Only UTA students can register"
  },
  passwordValidator: {
    validator:function (p) {
        const passwordregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
        return passwordregex.test(p)
    },
    message:"Password should contain atleast 8 chars with 1 lowercase, 1 uppercase and 1 digit"
}
};
