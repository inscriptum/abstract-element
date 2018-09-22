import * as litHtml from 'lit-html';



export default (container, template) => {
  const html = litHtml.html`${template}`;
  litHtml.render(html, container);
}