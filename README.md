<h1>facespace</h1>

View it live [here](https://nsars19.github.io/facebookish/)

The api that this UI relies on can be found [here](https://github.com/nsars19/facebookish-api)

This project is the final project in The Odin Project's javascript curriculum.
A link to the project requirements can be found [here](https://www.theodinproject.com/paths/full-stack-ruby-on-rails/courses/javascript/lessons/final-project-116ff273-1e55-4055-bd7f-146c17d0ec9c)

This project was built with React, Node, Express, MongoDB, and AWS S3.
The data is stored in a mongodb collection, and fetched from the express app. The React UI calls the various RESTful endpoints of the express app, and formats the JSON payloads into something the user can (hopefully) enjoy looking at.

Users are authenticated via token, using jsonwebtoken, and all but GET requests require a user's token in order to proceed. 

Static assets (only images in this case) are handled pass-through. Images are first processed, and then stored in an S3 bucket, and piped directly through S3 to the UI via express & the S3 SDK. The uploading & processing of images was done via Multer and Sharp, respectively. 

In detail: When a user uploads an image, Multer creates a file for it, Sharp then uses that file to convert it to jpeg, compresses it, and creates a file for the newly processed image. This newly processed image is uploaded to S3, with the returned data assigned to a database object for later retrieval. Both image files are deleted after processing. To retrieve the images, img elements are given a src attribute that calls the api's endpoint for fetching images from S3, and then the image data is piped through to the UI.

This project was, to date, the most enjoyable thing I've built. It was (at the time of my writing this) the perfect level of challenging for my abilities. This was my first (big) project built using express, which I've come to thoroughly enjoy. Much of what I have built in the past has used rails as a backend, so the transition was very smooth given I used an MVC architecture, which is what rails uses, for the express app.
