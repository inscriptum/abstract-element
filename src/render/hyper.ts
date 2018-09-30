import hyperHTML from 'hyperhtml/esm';



export default (container, template) => {
  hyperHTML.bind(container)`${template}`;
}