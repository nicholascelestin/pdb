// Lightweight component framework

import Mustache from 'mustache';

export default class Component {
  constructor(config) {
    validateConfig(config);
    this.id = config.id;
    this.controller = config.controller;
    this.templateUrl = config.templateUrl;
    this.properties = generateProperties(config);
    this.element = {};


    function validateConfig(config) {
      if (!config.id || (!config.template && !config.templateUrl) || !config.controller) {
        throw "Component missing essential properties";
      }
    }

    function generateProperties(config) {
      let properties = [];
      if (Array.isArray(config.properties)) {
        config.properties.forEach((propertyName) => {
          console.log('this', this);
          let x = document.getElementById(config.id);
          let y = x.getAttribute(propertyName);
          properties[propertyName] = y;
        })
      }
      return properties;
    }


  }

  async init() {
    this.template = await this.getTemplate(this.templateUrl);
    this.element = document.getElementById(this.id);
    this.controller.apply(null, [this]);
  }

  async getTemplate() {
    if (this.template) {
      return this.template;
    }

    if (this.templateUrl) {
      let resp = await fetch(this.templateUrl);
      let text = await resp.text();
      return text;
    }

  }

  async render(viewModel) {
    let render = await Mustache.render(this.template, viewModel);
    this.element.innerHTML = render
  }

};
