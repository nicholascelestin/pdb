define(['app/component', 'showdown'], function(Component, showdown){
  let config = {
    id: 'app-main',
    template: `{{{html}}} {{title}} spends {{calc}}`,
    controller:  (async () => {
      let request = new Request('sources/db/books.md');
      let resp = await fetch(request);
      let text = await resp.text();
      // let parsed = parseMD(text);
      // console.log('parsed', parsed)
      let converter = new showdown.Converter()
      return {title: 'Hoy', calc: '100', html: converter.makeHtml(text)};
    })()
  };
  
  let component = new Component(config);
  component.render();
  
  
  function parseMD(text){
    let re = /^([a-zA-Z ]+):(.*)$/gm
    let final = [];
    let items = text.split("---");
    items.pop();
    items.forEach((item)=>{
      let x;
      let fields = item.split(/[\n|\r]+/);
      fields.forEach((field)=>{
        // let pairs = item.split(/[A-Za-Z ]+/)
        // console.log('pairs', pairs);
      })
     console.log('item', fields);
    })
    
    
    return text;
  }
});

