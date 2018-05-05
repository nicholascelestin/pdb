define(['mustache', 'yaml'], function(Mustache, Yaml){
  return class Component {
  constructor(config){
    if(!config.id || !config.template || !config.controller){
      throw "Component missing essential properties";  
    }
    this.id = config.id;
    this.template = config.template;
    this.controller = config.controller;
  }
  async render(){
    // console.log("BANANA");
    // console.log('Yaml', Yaml);
    // let books = Yaml.load('sources/db/books.yaml');
    // console.log('books', books);
    let controller = await this.controller;
    let render = Mustache.render(this.template, controller);
    let element = document.getElementById('app-main');
    element.innerHTML = render
  }
};


});
