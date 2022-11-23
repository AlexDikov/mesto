export default class UserInfo {
  constructor ( {userName, userJob} ) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userAvatar = document.querySelector('.profile__avatar');
  };

  getUserInfo() {
    return {
    name: this._userName.textContent,
    job: this._userJob.textContent
    }
  };

  setUserInfo(name, job, avatar) {
    if (name) {
    this._userName.textContent = name;
    } if (job) {
    this._userJob.textContent = job;
    } if (avatar) {
    this._userAvatar.src = avatar;
    }
  };

}