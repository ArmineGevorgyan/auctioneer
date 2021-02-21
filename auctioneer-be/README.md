# Auctioneer API Server

Auctioneer is an API Server written with Laravel.

## Installation

Make sure you have PHP version >=7.2.5 and composer installed.

1. Set up the MySQL server and PHP by installing XAMPP from [here](https://www.apachefriends.org/download.html). Please choose version 7.4.14 / PHP 7.4.14.

2. Once the installation has finished, open the control panel and start Apache and MySQl.

3. Add C:\xampp\php in your environment PATH.

4. Go to localhost/phpmyadmin and create a new database. Name it `auctioneer`. If you want to name it something else, you will need to change the database name in the code by editing the .env.example file.

5. Install composer from [here](https://getcomposer.org/download/).

6. Go to the project folder and run the following commands:

```bash
 composer install
 cp .env.example .env
 php artisan migrate --seed
```

## Start the Server

```bash
 php artisan serve
```

## Running the scheduler

In a production server you can start the scheduler by adding a cron command that runs the schedule:run command every minute. You can do so by adding the following to your crontab configuration:

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

In a testing or development environment you can start the scheduler by running the following command:

```bash
php artisan schedule:work
```

You can also make the scheduler work manually by running the following command:

```bash
php artisan schedule:run
```

## Maintaining the Server

1. In order to update the database with the new changes run the following command:

```bash
php artisan migrate
```

2. If you want to rebuild the database, run the following command:

```bash
php artisan migrate:fresh --seed
```

3. If you wish to clear the application cache, run the following commands:

```bash
php artisan cache:clear
php artisan route:clear
php artisan config:clear
php artisan view:clear
composer clearcache
composer dump-autoload
```
