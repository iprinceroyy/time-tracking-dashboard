## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Screenshot

![](./assets/design/desktop-preview.jpg)

### Links

- Live Site URL: [Live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

```css
.dashboard__activity{
    grid-template-columns: repeat(3, minmax(200px, 1fr));
}
```
```js
dashboard.addEventListener('click', e => {
    e.target.closest('.activity').classList.toggle('animate');
});
```

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@iprinceroyy](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@prince_popups](https://www.twitter.com/yourusername)
