import { prop } from 'abstract-element';
import { BaseEl } from './base';

export class AttributesEl extends BaseEl {
  @prop()
  searchText = '';

  constructor() {
    super(true);
  }

  render() {
    return (
      <section>
        <p>Finder is rendering with lit-html:</p>
        <label>Type text to the field</label>
        <input
          oninput={(e) => {
            this.searchText = (e.target || { value: '' }).value;
          }}
        ></input>
        {Finder({ searchText: this.searchText })}
      </section>
    );
  }
}

function Finder(props: { searchText: string }) {
  return (
    <section>
      <div>🕵</div>
      <p>
        I will find <b>{props.searchText}</b>
      </p>
    </section>
  );
}
