<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
    '*'     => array(
        'omitScriptNameInUrls'  => true,
        'testToEmailAddress'    => 'bwhitton@gmail.com',
        'enableCsrfProtection'  => true,
        'useEmailAsUsername'    => true
    ),

    '.dev'  => array(
        'devMode'           => true,
        'useCompressedJs'   => false,
        'requireMatchingUserAgentForSession' => false,
        'environmentVariables'  => array(
            'basePath'  => '/Users/noSlouch/www/social_computing/lab-site/public/',
            'baseUrl'   => 'http://lab.dev/'
        )
    ),

    '162.243.54.103' => array(
        'environmentVariables'  => array(
            'basePath'  => '/var/www/social/public/',
            'baseUrl'   => 'http://162.243.54.103/'
        )

    ),

    'socialstaging.media.mit.edu'   => array(
        'environmentVariables'  => array(
            'basePath'  => '/var/www/social-computing-staging/public/',
            'baseUrl'   => 'http://socialstaging.media.mit.edu/'
        )
    )

);
