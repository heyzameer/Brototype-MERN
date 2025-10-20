const cluster = require('cluster');
const worrker = require('worker_threads');

worrker.spawn(new URL('./worker.js', import.meta.url), {