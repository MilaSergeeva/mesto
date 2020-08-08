class UserInfo {
  constructor(userNameSelrctor, userOccupationInfo) {
    this._userNameElement = document.querySelector(userNameSelrctor);
    this._userOccupationElement = document.querySelector(userOccupationInfo);
  }

  getUserInfo() {
    return { userName: this._userNameElement.textContent, userOccupation: this._userOccupationElement.textContent };
  }

  setUserInfo({ userName, userOccupation }) {
    this._userNameElement.textContent = userName;
    this._userOccupationElement.textContent = userOccupation;
  }
}

export { UserInfo };
