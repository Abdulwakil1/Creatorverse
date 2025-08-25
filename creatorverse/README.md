# React + Vite

# WEB103 Prework - CreatorVerse

Submitted by: **Abdul Wakil Najibi**

About this web app: **CreatorVerse is a content creator directory app where users can view, add, edit, and delete creators. Each creator has their own details page with links to their social media and a short description.**

Time spent: **Approximately 2–4 hours per day across two weeks, totaling around 30–50 hours.**

---

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via fetch() (via Supabase client)**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

---

The following **optional** features are implemented:

- [ ] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

---

The following **additional** features are implemented:

- [x] Tailwind CSS used for responsive, modern styling instead of PicoCSS
- [x] Toastify integrated to show success/error messages for add, edit, and delete actions
- [x] Delete confirmation dialog for safer user interactions
- [x] Social media validation (YouTube, X/Twitter, Instagram, Other Socials cannot overlap)
- [x] Fully responsive layout (mobile-first with flex/grid)
- [x] Improved error handling and navigation after deletion or update
- [x] Card-based UI with hover effects for creators
- [x] Loading states and form feedback for better UX

---

## Video Walkthrough

Walkthrough is coming soon:

---

## Notes

Some challenges included:

- Handling async navigation after deleting a creator (to avoid “Failed to load creator” errors).
- Validating social media inputs properly so they point to the correct platforms.
- Ensuring the delete confirmation modal worked independently from the form submit button.
- Styling with Tailwind while keeping layout fully responsive across devices.

---

## License

Copyright 2025 Abdul Wakil Najibi

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
