'use strict';

const dashboard = document.querySelector('.dashboard');

const formatClassName = word => word.toLowerCase().split(' ').join('-');

const btnDaily = document.querySelector('.js--daily');
const btnWeekly = document.querySelector('.js--weekly');
const btnMonthly = document.querySelector('.js--monthly');
const activity = document.querySelector('.activity');

let prev = [];
let curr = [];
let next = [];
const states = ['daily', 'weekly', 'monthly'];
const displayData = tar => {
    fetch('./data.json')
        .then(Response => Response.json())
        .then(jsonData => {
            jsonData.forEach(data => {
                let html;
                const addhtml = timeSpan => {
                    html = `<section class="activity activity--${formatClassName(
            data.title
          )}">
            <div class="activity__status ${tar}">
                <h2 class="activity__title">${data.title}</h2>
                <hr>
                <p class="current status__current__${formatClassName(
                  data.title
                )}">${data.timeframes[timeSpan].current}hrs</p>
                <p class="previous status__previous__${formatClassName(
                  data.title
                )}">Last Week - ${data.timeframes[timeSpan].previous}hrs</p>
            </div>
        </section>`;

                    return html;
                };

                // Call addHtml with target day
                dashboard.insertAdjacentHTML('beforeend', addhtml(tar));
            });

            const tests = document.querySelectorAll(`.${tar}`);

            if (curr) {
                const currEle = document.querySelectorAll(`.${curr[0]}`);
                currEle.forEach(ce => {
                    ce.classList.remove('active');
                });
            }

            if (prev) {
                const prevEle = document.querySelectorAll(`.${prev[0]}`);
                console.log(prevEle);
                prevEle.forEach(pe => {
                    pe.classList.remove('active');
                });
            }

            tests.forEach(test => {
                test.classList.add('active');
                curr.push(test.classList[1]);
            });
            prev = curr;
        });
};

const btns = document.querySelectorAll('.btn');
btns.forEach(btn => {
    // For Each btn add Event handler that calls displayData
    btn.addEventListener('click', e => {
        const activeElement = e.currentTarget.innerText.toLowerCase();
        displayData(activeElement);
    });
});

// Default display
window.addEventListener('load', () => {
    displayData('daily');
});