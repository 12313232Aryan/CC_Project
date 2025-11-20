// =============================================
// AWS Cognito Auth – LostNeeds (Final Version)
// =============================================

const poolData = {
  UserPoolId: "us-east-1_0a6s8SI0K",
  ClientId: "7upeouudeqn9hevcvb9lv4vbk3"
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Helpers
function showStatus(el, msg, ok) {
  el.className = ok ? "status-success" : "status-error";
  el.textContent = msg;
}

// Signup
window.signupUser = function (e) {
  e.preventDefault();

  const email = signupEmail.value;
  const pass = signupPassword.value;
  const confirm = confirmPassword.value;
  const el = signupStatus;

  if (pass !== confirm) return showStatus(el, "Passwords do not match", false);

  const attributes = [
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email })
  ];

  userPool.signUp(email, pass, attributes, null, (err) => {
    if (err) return showStatus(el, err.message, false);
    showStatus(el, "Signup success — verify via email", true);
  });
};

// Login
window.loginUser = function (e) {
  e.preventDefault();

  const email = loginEmail.value;
  const pass = loginPassword.value;
  const el = loginStatus;

  const auth = new AmazonCognitoIdentity.AuthenticationDetails({ Username: email, Password: pass });
  const user = new AmazonCognitoIdentity.CognitoUser({ Username: email, Pool: userPool });

  user.authenticateUser(auth, {
    onSuccess: (session) => {
      localStorage.setItem("idToken", session.getIdToken().getJwtToken());
      localStorage.setItem("accessToken", session.getAccessToken().getJwtToken());
      showStatus(el, "Login successful", true);
      setTimeout(() => (window.location.href = "index.html"), 600);
    },
    onFailure: (err) => showStatus(el, err.message, false)
  });
};

// Protect pages
window.requireAuth = function () {
  if (!localStorage.getItem("idToken")) {
    window.location.href = "login.html";
    return false;
  }
  return true;
};

// Logout
window.logout = function () {
  localStorage.clear();
  window.location.href = "login.html";
};
