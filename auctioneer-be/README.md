# Auctioneer API Server

Auctioneer is an API Server written with Laravel.

## Installation

Make sure you have PHP version >=7.2.5 and composer installed. 

1. Set up the MySQL server and PHP by installing XAMPP from [here](https://www.apachefriends.org/download.html). Please choose version 7.4.14 / PHP 7.4.14. 

2. Once the installation has finished, open the control panel and start Apache and MySQl.

4. Go to localhost/phpmyadmin and create a new database. Name it `auctioneer`. If you want to name it something else, you will need to change the database name in the code by editing the .env.example file.

3. Install composer from [here](https://getcomposer.org/download/).

4. Go to the project folder and run the following commands:
```bash
 composer install
 cp .env.example .env
 php artisan migrate --seed
```

## Start the Server

```bash
 php artisan serve
```
