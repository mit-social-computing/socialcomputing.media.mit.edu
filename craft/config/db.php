<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(

    '*' => array(
        'tablePrefix'   => 'craft'
    ),

    '.dev'  => array(
        'server'    => 'localhost',
        'user'      => 'root',
        'password'  => 'root',
        'database'  => 'social_computing'
    ),

    '162.243.54.103' => array(
        'server'    => 'localhost',
        'user'      => 'admin',
        'password'  => 'cLi7BEUv9Ug7pLXX',
        'database'  => 'social_computing_dev'  
    )

);
