'use strict';

const dashboard = document.querySelector('.dashboard__activity');
const acitvity = document.querySelector('.activity');
const activity = document.querySelector('.activity');

const activityArr = [
    'work',
    'play',
    'study',
    'exercise',
    'social',
    'self-care',
];

const formatTitle = (title) => title[0].toUpperCase() + title.substring(1)

let statusArr = [];
let clicked = false;
let html;

const displayData = (tar) => {
    fetch('./data.json')
        .then(Response => Response.json())
        .then(jsonData => {
            jsonData.forEach((data, i) => {
                const statuses = data.timeframes[`${tar}`];
                console.log(statuses);
                statusArr.push(statuses);
            });

            console.log(statusArr);

            if (clicked) checkActiveState();

            statusArr.forEach((status, i) => {
                html = `
                    <div class="active activity activity--${activityArr[i]} ${tar}">
                        <div class="activity__status">
                        <h2 class="activity__status--title">${formatTitle(activityArr[i])}</h2>
                        <hr class="activity__status--dots">
                        <p class="activity__status--current">${status.current}hrs</p>
                        <p class="activity__status--previous">Last Week - ${status.previous}hrs</p>
                    </div>
                </div>
                `;

                dashboard.insertAdjacentHTML('beforeend', html);
            });

            clicked = !clicked;
            statusArr = [];
        });
};

const checkActiveState = () => {
    const daily = document.querySelectorAll('.daily');
    const weekly = document.querySelectorAll('.weekly');
    const monthly = document.querySelectorAll('.monthly');

    if (daily) {
        daily.forEach(ele => {
            ele.classList.remove('active');
            console.log('daily class removed');
        });
    }

    if (weekly) {
        weekly.forEach(ele => {
            ele.classList.remove('active');
            console.log('weekly class removed');
        });
    }

    if (monthly) {
        monthly.forEach(ele => {
            ele.classList.remove('active');
            console.log('monthly class removed');
        });
    }

    clicked = !clicked;
}

const day = document.querySelector('.day');
day.addEventListener('click', e => {
    if (!e.target.classList.contains('btn')) return;

    if (e.target.classList.contains('js--daily')) {
        displayData('daily');
    }

    if (e.target.classList.contains('js--weekly')) {
        displayData('weekly');
    }

    if (e.target.classList.contains('js--monthly')) {
        displayData('monthly');
    }
});

displayData('weekly');

const renderActivity = (arr, index) => {
    html = `
        <div class="activity activity--play ${day}">
            <div class="activity__status">
                <h2 class="activity__status--title">Play</h2>
                <hr class="activity__status--dots">
                <p class="activity__status--current">10hrs</p>
                <p class="activity__status--previous">Last Week - 36hrs</p>
            </div>
        </div>
    `;
    dashboard.insertAdjacentElement('beforeend', html);
};