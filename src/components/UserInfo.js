export default class UserInfo {
  constructor ( {userName, userJob} ) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  };

  getUserInfo() {
    return {
    name: this._userName.textContent,
    job: this._userJob.textContent
    }
  };

  setUserInfo(name, job, avatar) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
    document.querySelector('.profile__avatar').src = avatar;
  };
}