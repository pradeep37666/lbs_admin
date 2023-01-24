# Moonward Next.js Web Application Template

Welcome to the Moonward Next.js web application template. This template is intended to be the starting point for any web based projects. If you're creating an admin panel please refer to the [admin panel template](https://github.com/moonward-apps/web-admin-panel-template).

The goal of this template is to give access to common structure and tooling that we're likely to need for any web based application. There are a few dependencies which this readme will outline, but if there seems to be any dependency errors please let a relevant developer know. Also likewise if you have any feedback about how anything is setup or would like to suggest additions/removals please don't hesitate to talk to someone about it.

# Getting Started

First, run the development server:
npm run dev
yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

Routing is handled inherently by Next.js, if you want to create a new route create a folder in the pages directory, the name of this folder will be the route name. Learn more here: [Next.js Routing](https://nextjs.org/docs/routing/introduction)

# Dependencies

Here's a list of the dependencies in the application by default, and resources so that you can learn about them if you need to.

## Tailwind 💨

The css framework for easy inline styling with premade CSS classes. With this framework we don't need to any CSS in our application, its all done through easy to use class names with intellisense through the VSC extension ([Tailwind CSS IntelliSense by Tailwind Labs](https://github.com/tailwindlabs/tailwindcss-intellisense)).

[Learn more about Tailwind](https://tailwindcss.com/)

## Jotai 👻

Jotai is our global state manager for this project. It is designed to be incredibly simple and efficient, we only need to bind the global state that we need, where we need it. You can see an example of Jotai's use with the useAtom hook in the main \_app.tsx file. In this case we're using it to store a global snackbar details object. See stores --> atoms for more.

[Learn more about Jotai](https://jotai.org/)

## Zustand 🧸

Zustand is our extended state machine for this project. It is similar to Jotai in the sense that it is simple and lightweight, however Zustand gives us access to a full state machine where we can perform operations on our state as opposed to just updating/reading. See stores --> bear-pack-slice.ts for a nice example of our bear state.

[Learn more about Zustand](https://github.com/pmndrs/zustand)

## React Query ⚡

React query is our caching and async state management. Extremely powerful tool which is yet again, quite light weight especially implementation wise. There will definitely be a few nuances to pick up especially if you aren't used to caching and invalidating queries or working with mutations. See pages --> example --> index.tsx for a paginated pokemon example.

[Learn more about React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original)

## Axios ✨

Enhanced api calling library for extra functionality and interceptors on requests and responses

[Learn more about Axios](https://axios-http.com/docs/intro)

## Formik ✉️

A useful form tool which gives us access to many validation options for our forms.

[Learn more about Formik](https://formik.org/docs/overview)

## Yup ✅

Schema builder which goes hand in hand with formik to create correctly structured schemas for our forms.

[Learn more about Yup](https://github.com/jquense/yup)

# Not Included Dependencies

These are dependencies which you will find in parts of the project, however are not installed by default. These are not installed because, while they are extremely useful, its not guaranteed that every project will be using them. Note: by keeping this code in your codebase without installing them you will not get errors while in development, however you will on build.

If you'd like to quickly install these to remove all dependency issues:

npm i --save-dev @types/googlemaps @types/google-libphonenumber google-libphonenumber

## Google Maps Types

This package gives you access to types from google maps api results. This is used in the parse-google-address utility. Necessary if working with any sort of google api.

npm i --save-dev @types/googlemaps

## Google Lib Phonenumber

This package gives you access to useful utilities to quickly validate a phone number input. This is extremely important if you need to deal with user entered phone numbers, especially if they could be from multiple countries and country codes are important. This is used in the parse-mobile-number util as well as in the default validation schema.

npm i @types/google-libphonenumber google-libphonenumber
