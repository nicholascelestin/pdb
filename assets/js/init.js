requirejs.config({
  baseUrl: 'assets/js/lib',
  paths: {app: '../components' }
});

requirejs(['app/main'], function(){
console.log('init');
});