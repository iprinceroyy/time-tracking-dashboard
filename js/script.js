'use strict';

const dashboard = document.querySelector('.dashboard');

const btnDaily = document.querySelector('.js--daily');
const btnWeekly = document.querySelector('.js--weekly');
const btnMonthly = document.querySelector('.js--monthly');
const activity = document.querySelector('.activity');

const states = ['daily', 'weekly', 'monthly'];

const displayData = tar => {
    fetch('./data.json')
        .then(Response => Response.json())
        .then(jsonData => {
            jsonData.forEach(data => {
                console.log(data);
            });
        });
};
const day = document.querySelector('.day');
day.addEventListener('click', e => {
    if (e.target.classList.contains('btn')) displayData('daily');
});