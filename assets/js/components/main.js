import Component from './component';
import List from 'list.js';
import Yaml from 'yamljs';

let config = {
  id: 'app-main',
  properties: ['data-db'],
  templateUrl: `assets/templates/template.mustache`,
  controller: controller,
};
let component = new Component(config);
component.init();

async function controller(component) {

  // Fetch Data
  let request = new Request(component.properties['data-db']);
  let resp = await fetch(request);
  let text = await resp.text();
  let books = await Yaml.parse(text);


  // Manipulate Data
  let objects = makeObjectFieldsMachineReadable(books);
  let fields = buildListOfAllFieldsFromObjects(items);
  objects = makeAllObjectsHaveSameFields(books, fields);
  let headers = buildHeaders(fields);
  let row = buildRow(fields);

  // Render Component HTML
  await component.render({headers: headers.innerHTML});

  // Manipulate DOM
  let options = {
    valueNames: fields,
    item: row.outerHTML
  };
  let booksList = new List('books', options, objects);
}


function humanizeText(text) {
  let humanized = text.replace('-', ' ');
  return humanized.replace(/(^([a-z])|(\s([a-z])))/gm, (m) => m.toUpperCase());
}

function makeObjectFieldsMachineReadable(objects) {
  return objects.map((book) => {
    let keys = Object.keys(book);
    keys.forEach((oldKey) => {
      if (oldKey.includes(' ')) {
        let newKey = oldKey.replace(' ', '-');
        book[newKey] = book[oldKey];
        delete book[oldKey];
      }
    });
    return book;
  });

}

function buildListOfAllFieldsFromObjects(objects) {
  let fields = [];
  objects.forEach(object => {
    fields = fields.concat(Object.keys(object));
  });

  return fields
    .filter((object, pos) => fields.indexOf(object) === pos)
    .map((field) => field.replace(' ', '-'));
}

function makeAllObjectsHaveSameFields(objects, fields) {
  return objects.map((object) => {
    fields.forEach((field) => {

      !(object[field]) ? (object[field] = null) : null;
    });
    return object;
  })

}

function buildHeaders(fields) {
  let headers = document.createElement('tr');
  fields.forEach((column) => {
    let td = document.createElement('th');
    td.appendChild(document.createTextNode(humanizeText(column)));
    td.classList.add('sort');
    td.setAttribute('data-sort', column);
    headers.appendChild(td);
  });
  return headers;
}

function buildRow(fields) {
  let row = document.createElement('tr');
  fields.forEach((column) => {
    let td = document.createElement('td');
    td.classList.add(column);
    row.appendChild(td);
  });
  return row;
}



