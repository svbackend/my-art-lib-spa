<?php

namespace Deployer;

// vendor/bin/dep deploy

require_once 'recipe/rsync.php';
$config = require_once './deploy_config.php';

set('rsync_src', __DIR__);
set('release_path', $config['deploy_path']);

host($config['host'])
    ->user($config['login'])
    ->set('deploy_path', $config['deploy_path']);

set('rsync', [
    'exclude' => [
        'node_modules',
        '.git',
        'deploy.php',
        'deploy_config.php',
        'old_index.html',
    ],
    'exclude-file' => false,
    'include' => [],
    'include-file' => false,
    'filter' => [],
    'filter-file' => false,
    'filter-perdir' => false,
    'flags' => 'rz',
    'options' => ['delete'],
    'timeout' => 300,
]);

task('deploy:prepare', function () {
    $id = time();
    runLocally("cp index.html old_index.html");
    runLocally("cp .env.json .env.old");
    runLocally("cp .env.json.dist .env.json");
    runLocally("sed -i 's/build.js/build.js\?v={$id}/g' index.html");
    runLocally('npm run build');
});

task('cleanup', function () {
    runLocally("unlink .env");
    runLocally("cp .env.old .env.json");
    runLocally("unlink index.html");
    runLocally("mv old_index.html index.html");
});

task('deploy', [
    'deploy:prepare',
    'rsync',
    'cleanup',
]);
