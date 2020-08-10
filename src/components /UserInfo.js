class UserInfo {
  constructor(userNameSelrctor, userOccupationSelector) {
    this._userNameElement = document.querySelector(userNameSelrctor);
    this._userOccupationElement = document.querySelector(userOccupationSelector);
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
