'use strict';

const countrySelect = document.querySelector('#country');
const citySelect = document.querySelector('#city');
const result = document.querySelector('.result');

const cityArr = {
  rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
  uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
  bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест', 'ф', 'фdasd', 'qweqe'],
  jap: ['Токио', 'Киото', 'Осака', 'Иокогама'] 
}

function init() {
  const currentCountry = countrySelect[countrySelect.selectedIndex].textContent;
  const currentCity = citySelect[citySelect.selectedIndex].textContent;
  result.textContent = `${currentCountry} ${currentCity}`;
}

function addCities() {
  const currentCountryCities = cityArr[countrySelect.value];
  citySelect.innerHTML = '';

  currentCountryCities.forEach((item, i, arr) => {
    const option = document.createElement('option');
    option.value = countrySelect.value;
    option.textContent = cityArr[countrySelect.value][i];
    citySelect.appendChild(option);
  })

  init();
  citySelect.style.display = 'inline-block';
}

countrySelect.addEventListener('input', addCities);

citySelect.addEventListener('input', init)

