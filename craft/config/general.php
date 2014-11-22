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
        'cpTrigger'             => 'login',
        'testToEmailAddress'    => 'bwhitton@gmail.com',
        'enableCsrfProtection'  => true
    ),

    '.dev'  => array(
        'devMode'           => true,
        'useCompressedJs'   => false,
        'requireMatchingUserAgentForSession' => false,
        'environmentVariables'  => array(
            'basePath'  => '/Users/noSlouch/www/social_computing/lab-site/public/',
            'baseUrl'   => 'http://lab.dev/'
        )
    )
);
