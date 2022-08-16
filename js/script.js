'use strict';

const dashboard = document.querySelector('.dashboard__activity');
const acitvity = document.querySelector('.activity');
const day = document.querySelector('.day');

const formatActivity = (activity) => activity.toLowerCase().split(' ').join('-');

const formatTitle = (title) => title[0].toUpperCase() + title.substring(1)

let statusArr = [];
let activityArr = [];
let clicked = false;
let html;
const fetchData = tar => {
    fetch('./data.json')
        .then(response => response.json())
        .then(jsonData => {
            jsonData.forEach(data => {
                // Status of each activity is pushed as obj like {curr: 2, prev: 4}
                statusArr.push(data.timeframes[`${tar}`]);
                // Each title with specified format is pushed
                activityArr.push(formatActivity(data.title));
            });

            // Before adding html, remove active class html
            if (clicked) checkActiveState();

            statusArr.forEach((status, i) => renderActivity(status, i, tar));

            // Alter clicked state
            clicked = !clicked;
            // Empty status arr to hold only 6 objects
            statusArr = [];
            // Empty activity arr to hold onlye 6 activities
            activityArr = [];
        });
};

// Render activity with status, i, tar being passed.
const renderActivity = (status, i, tar) => {
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
    // Active target btn
    document.querySelector(`.js--${tar}`).classList.add('btn-active');

};

const checkActiveState = () => {
    const daily = document.querySelectorAll('.daily');
    const weekly = document.querySelectorAll('.weekly');
    const monthly = document.querySelectorAll('.monthly');

    // If elements exist with the following class, first remove it
    // Then call displayData func
    if (daily) {
        document.querySelector(`.js--daily`).classList.remove('btn-active');
        daily.forEach(ele => ele.classList.remove('active'));
    }

    if (weekly) {
        document.querySelector(`.js--weekly`).classList.remove('btn-active');
        weekly.forEach(ele => ele.classList.remove('active'));
    }

    if (monthly) {
        document.querySelector(`.js--monthly`).classList.remove('btn-active');
        monthly.forEach(ele => ele.classList.remove('active'));
    }

    // To persist clicked state
    clicked = !clicked;
}

day.addEventListener('click', e => {
    // Guard clause
    if (!e.target.classList.contains('btn')) return;

    e.target.classList.contains('js--daily') && fetchData('daily');

    e.target.classList.contains('js--weekly') && fetchData('weekly');

    e.target.classList.contains('js--monthly') && fetchData('monthly');

});

// Initially display data for weekly
fetchData('weekly');

// After display
document.querySelectorAll('.activity').forEach(act => {
    act.addEventListener('click', e => {
        console.log(e);
    });
});

// Animate card
dashboard.addEventListener('click', e => {
    e.target.closest('.activity').classList.toggle('animate');
});