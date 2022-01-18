# Frontend Mentor - Product feedback app solution

This is a solution to the [Product feedback app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Links

- Solution URL: [Add solution URL here](https://github.com/Aycom366/product-feedback-app-frontend)
- Live Site URL: [Add live site URL here](https://product-feedback-app-frontend.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- [Chakra-UI](https://chakra-ui.com/) CSS library used
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Typescript](https://www.typescriptlang.org/) - Javascript typed language
- [Redux-Toolkit](https://redux-toolkit.js.org/) - React state management library
- [Styled Components](https://styled-components.com/) - For styles
- [axios](https://axios-http.com/) - Making Http Requests
- [Express](https://expressjs.com/) - Backend Framework used with nodejs
- [Mongodb](https://www.mongodb.com/) - The database used for the app
- [Mongoose](https://mongoosejs.com/) - Mongodb database framework used in conjunction with mongodb above.

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

Am actually happy becuase am able to finish this project. Although there are obstacles met along the way(Bugs) but thanks to my friends and other web programmer people out there to help me. The main motive behind making this project is because I need to sharpen my backend API skills, and I really enjoy writing the backend code. It was fun and interesting, most importantly the google Login and email sending. I had to shift from using libraries like mailTrap and the likes coz i have to send emails real time. so with the help of gmail smtp. I was able to send real emails.
The react google login package also aids my development in the Front side with React. The google login wont be possible if I hadn't used this package.
I wish Fontend mentor introduces Advanced Guru project just like real world coz I think have dont all frontend mentor guru project.
And most importantly, I used typescript for this project. yah!!!!!!!!!!!!!!!!!. I must say Typescript really really really helped me aid the development of this project on the frontside. I just enjoy the mad suggestions it also brings if i have forgotten the variable name I need to use in some other context in the application.

```Typescript
export interface Feedback {
  _id?: string | any;
  feedbackTitle?: string;
  feedbackCategory?: string;
  feedbackDetails?: string;
  user?: UserInformation;
  feedbackStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comment?: Comment | any;
  upvote?: Upvote | any;
}
```

with the interface above, Typscript gives me suggestions of the Feedback property values if I need to use the Feedback Interface.

### Continued development

- currently in my backend, the method of which am using to populate other collections is not satisfying. I learn that I can actually used the mongoose middleware for populating other collections rather that writing the populate functions everytime in my controllers
- Also at the frontside, I'll be looking forware to add a theme switch. Dark and Light toggle.

## Author

- Website - [Temitayo](https://temitayo-portfolio.vercel.app/)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@bamigboyeayomi5](https://www.twitter.com/bamigboyeayomide5)
