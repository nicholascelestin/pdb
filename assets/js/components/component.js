define(['mustache'], function(Mustache){
  return class Component {
  constructor(config){
    this.config = config;
    if(!config.id || (!config.template && !config.templateUrl) || !config.controller){
      throw "Component missing essential properties";  
    }
    this.id = config.id;
    this.controller = config.controller;
    this.properties = {};
    if(Array.isArray(config.properties)){
      config.properties.forEach((propertyName)=>{
        let x = document.getElementById(this.id).getAttribute(propertyName);
        this.properties[propertyName] = x;
      })
    }
  }

  async getTemplate(config){
    if(config.template){
      return config.template;
    }

    if(config.templateUrl){
      let resp = await fetch(config.templateUrl);
      let text = await resp.text();
      return text;
    }

  }
  async render(){
    let template = await this.getTemplate(this.config);
    console.log('template', template);
    let controller = await this.controller.apply(null, [this]);
    let render = Mustache.render(template, controller);
    let element = document.getElementById(this.id);
    element.innerHTML = render
  }
};


});
