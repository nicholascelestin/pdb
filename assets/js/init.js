requirejs.config({
  baseUrl: './lib',
  paths: {app: '../components', requireLib: 'require', init: '../init'}
});

requirejs(['app/main'], function(){
console.log('init');
});