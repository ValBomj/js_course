"use strict";

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import animation from './modules/animation';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourTeam from './modules/ourTeam';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';
import formValid from './modules/formValid';

// Timer
countTimer("5 july 2020");
// Scroll animation
animation();
// Menu
toggleMenu();
// Popup
togglePopup();
// Tabs
tabs();
// Slider
slider();
// Team
ourTeam();
// Calculator
calculator(100);
sendForm();
formValid();
