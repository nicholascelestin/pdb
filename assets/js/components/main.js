define(['app/component', 'list', 'yaml'], function (Component, List, YAML) {
  console.log('yaml', YAML);
  let controller, config = {
    id: 'app-main',
    properties: ['dbIndex'],
    templateUrl: `assets/templates/template.mustache`,
    controller: async (component) => {
      let request = new Request('db/books.md');
      let resp = await fetch(request);
      let text = await resp.text();
      let books = Yaml.parse(text);
      console.log('books', books);
      return { title: 'Hoy'};
    }
  };

  let component = new Component(config);
  component.render().then(() => {
    let options = {
      valueNames: ['id', 'title', 'creator', 'description'],
      item: `<tr>
        <td class="title"></td>
        <td class="creator"></td>
        <td class="description"></td>
        <td></td>
      </tr>`
    };
    let values = [{
      title: "Thinking Fast & Slow",
      creator: "Danny Kaufman",
      description: "revelatory."
    }]
    let booksList = new List('books', options, values);
  })


});

