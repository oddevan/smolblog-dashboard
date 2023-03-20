<form>
  <div class="row mb-4">
    <label for="inputCurrentPassword" class="col-lg-2 col-form-label">Current Password</label>
    <div class="col-lg">
      <input type="password" class="form-control" id="inputCurrentPassword" aria-describedby="inputCurrentPasswordHelp">
			<span class="form-text" id="inputCurrentPasswordHelp">Please enter your current password to change these options.</span>
    </div>
  </div>
  <div class="row mb-4">
    <label for="inputNewPassword" class="col-lg-2 col-form-label">New Password</label>
    <div class="col-lg">
      <input type="password" class="form-control" id="inputNewPassword" aria-describedby="inputNewPasswordHelp">
			<span class="form-text" id="inputNewPasswordHelp">If you want to change your password, enter it here.</span>
    </div>
  </div>
  <div class="row mb-4">
    <label for="inputTwoFactor" class="col-lg-2 col-form-label">Two-Factor Authentication</label>
    <div class="col-lg">
      <input type="text" class="form-control" id="inputTwoFactor" aria-describedby="inputTwoFactorHelp">
			<span class="form-text" id="inputTwoFactorHelp">Reset your authenticator app here.</span>
    </div>
  </div>
	<button class="btn btn-primary">Save</button>
</form>