# DevProfileGenerator

# Video of program running
https://drive.google.com/file/d/1FKTBm2o3oFF9pejoEZo03djO5i9RGZqK/view

# User Story

As a director, I want to be able to instantly generate uniform developer profiles to provide information for clients.

# Overview

This program extrapolates specified user data from GitHub

Given that the developer has a GitHub profile

When prompted for GitHub username and preferred color scheme

Then a corresponding PDF is generated from HTML

This pdf contains
- Profile Image
- User Name
- Links to:
    - User location via google maps
    - User GitHub Profile
    - User Blog
- User Bio
- Number of Public repositories
- Number of followers
- Numner of GitHub stars
- Number of users following 

# npms (node package managers) used
- electron-html-to
- electron
- open
- path
- fs
- axios
- inquirer
- dotenv
