# Contentful AWS S3 File Uploader
This single page application was build based on contentful App Framework. 

It basicaly builds a text field that lets you to upload a image to a s3 bucket, and storage the public URL to it in your content.

## Configuration

### Enviroment Variables
`REACT_APP_AWS_REGION` = AWS Region

`REACT_APP_AWS_BUCKET` = AWS S3 Bucket Name

`REACT_APP_AWS_IDENTITY_POOL_ID` = Full AWS Cognito Identity Pool Id

# About contentful

This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

## Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in Contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Libraries to use

To make your app look and feel like Contentful use the following libraries:

- [Forma 36](https://f36.contentful.com/) – Contentful's design system
- [Contentful Field Editors](https://www.contentful.com/developers/docs/extensibility/field-editors/) – Contentful's field editor React components

## Learn More

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.

Create Contentful App uses [Create React App](https://create-react-app.dev/). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) and how to further customize your app.

# About AWS

You can follow this [tutorial](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-photo-album-full.html) to add more functionality, like list existing albums and images.

To autenticate you will need to user Amazon Cognito and Identity Pool, like is described in the first steps of [this](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-react-native.html) tutorial.

To make the URL address of your files public to the internet you will nedd to make some changes on the Amazon S3 bucket permissions. [Read more](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-use-case-2)