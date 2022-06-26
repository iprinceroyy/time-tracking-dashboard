'use strict';

const dashboard = document.querySelector('.dashboard');

const formatClassName = word => word.toLowerCase().split(' ').join('-');

const btnDaily = document.querySelector('.js--daily');
const btnWeekly = document.querySelector('.js--weekly');
const btnMonthly = document.querySelector('.js--monthly');

fetch('./data.json')
    .then(Response => Response.json())
    .then(jsonData => {
        jsonData.forEach(data => {
            let html;
            const addhtml = timeSpan => {
                html = `<section class="activity activity--${formatClassName(
          data.title
        )}">
            <div class="activity__status">
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
            dashboard.insertAdjacentHTML('beforeend', addhtml('daily'));
        });
    });