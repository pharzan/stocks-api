
# STOCK API
This repository contains my solution to a coding challenge for a job interview. I thought I'd do a video recording of the process. It's something I wanted to do for a long time and I thought this would be a good start.

## Walkthrough:

1. [Introduction](https://youtu.be/hwnxxsOdv7U)
2. [Understanding the problem](https://youtu.be/n3XQW5UAm50)
3. [Creating the structure for the project](https://youtu.be/kOOvCnUGS5M)
4. [POSTGRES database on AWS and tables creation](https://youtu.be/hK3fTaQKpVI)
5. [Adding KNEXjs and DB connection Node](https://youtu.be/FdpUoD5M5Io)
6. [Creating first records and queries  using KNEXjs](https://youtu.be/NQT9TJc6aCw)
7. [Testing endpoints with POSTMAN Node](https://youtu.be/PpSQCSK_fOc)
8. [Adding more complex queries and finishing the endpoints](https://youtu.be/cNP8UP1z-rU)
9. [refactor the code -- part 1](https://youtu.be/XllzcD2nAPI)
10. [Add more Typescript and refactor the code -- part 2](https://youtu.be/Ad6e0JE9iZw)
11. [More Typescript and TESTS Node](https://youtu.be/eIQt3uCkrfs)
12. [Making the tests work Node](https://youtu.be/MbJh_HCFve0)
13. [Create the DOCKER image](https://youtu.be/Sdj0uutFRDk)
14. [Running the docker image](https://youtu.be/GaplFe7ve34)
## Usag

To start developing use the following:
``npm install``
``npm run dev``

To create test entries and make the tests:
``npm run test``

A Docker image is included and if you need to run the docker file you can build and run it as below:

``docker build -f Dockerfile -t stocks-api``
``docker run -it -p 3000:3000 stocks-api``

## Endpoints

A postman collection can be found [here](./postman_collection/stocks-api.postman_collection.json).

##
[Initiate a git repository]()
Remove express and excessive code from the current code
Add required dependencies and packages
Create the structure for the endpoints
Create db a Postgres on aws and the required tables and fields
Create db connections using Knex
Create endpoints logic
Do a refactoring and add typescript requirements
Run the tests
Create a docker file
Create a simple front
Github actions and beyond
