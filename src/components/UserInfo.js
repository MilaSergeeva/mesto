class UserInfo {
  constructor(userNameSelrctor, userOccupationSelector, userAvatarSelector) {
    this._userNameElement = document.querySelector(userNameSelrctor);
    this._userOccupationElement = document.querySelector(userOccupationSelector);
    this._userAvatarSelector = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return this.userInfo;
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo;

    this._userNameElement.textContent = this.userInfo.name;
    this._userOccupationElement.textContent = this.userInfo.about;

    this._userAvatarSelector.src = this.userInfo.avatar;
    this._userAvatarSelector.alt = this.userInfo.name;
  }
}

export { UserInfo };
