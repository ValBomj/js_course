"use strict";

const reg = document.getElementById("register");
const log = document.getElementById("login");
const userList = document.querySelector(".user-list");
const helloUser = document.querySelector(".title span");

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let usersData = [];

const resetData = function () {
  if (localStorage.usersData) {
    usersData = JSON.parse(localStorage.usersData);
  } else {
    usersData = [];
  }
};
resetData();

const render = function () {
  userList.textContent = "";
  usersData.forEach(function (item, i, array) {
    const li = document.createElement("li");
    li.innerHTML =
      "Имя: " +
      item.userName +
      ", Фамилия: " +
      item.userLastname +
      ", зарегистрирован: " +
      item.userDate +
      '<button class="remove" id="remove" type="button">Remove</button>';
    userList.append(li);

    const rem = document.getElementById("remove");
    rem.addEventListener("click", function () {
      array.splice(i, 1);
      localStorage.setItem("usersData", JSON.stringify(array));
      render();
    });
    localStorage.setItem("usersData", JSON.stringify(usersData));
  });
};
render();
const registerFunc = function () {
  let fullName;
  let login;
  let password;

  do {
    fullName = prompt("Введите через пробел Имя и Фамилию пользователя");
  } while (
    isNumber(+fullName.split(" ")[0]) ||
    isNumber(+fullName.split(" ")[1]) ||
    fullName === null ||
    fullName.trim().split(" ").length !== 2 ||
    fullName.trim() === ""
  );

  do {
    login = prompt("Введите Логин");
    console.log(login.trim().split(" "));
  } while (login === null || login.trim() === "");

  do {
    password = prompt("Введите Пароль");
    console.log(password.trim().split(" "));
  } while (
    password === null ||
    password.trim().split(" ").length !== 1 ||
    password.trim() === ""
  );

  const date = new Date();
  const name = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1];

  usersData.push({
    userName: name,
    userLastname: lastName,
    userLogin: login,
    userPassword: password,
    userDate: date,
  });

  render();
};

const loginFunc = function () {
  usersData.forEach(function (item) {
    if (item.userLogin === prompt("Введите Логин")) {
      if (item.userPassword === prompt("Введите Пароль")) {
        helloUser.textContent = item.userName;
      } else {
        if (confirm("Пароль введён не верно. Попробуете ещё раз?")) {
          loginFunc();
        }
      }
    } else {
      if (
        confirm("Пользователь с таким именем не найден. Попробуете ещё раз?")
      ) {
        loginFunc();
      }
    }
  });
};

reg.addEventListener("click", registerFunc);
log.addEventListener("click", loginFunc);
