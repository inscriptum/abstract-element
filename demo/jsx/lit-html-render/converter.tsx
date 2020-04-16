import { prop, define } from 'abstract-element';
import { BaseEl } from './base';

function boolAttr(state, key: string, value: any) {
  value = typeof value === 'string' ? true : Boolean(value);
  
  return value !== state[key] ? { ...state, [key]: value } : undefined;
}

interface LoaderElProps {
  loading: boolean;
}

/**
 * The demo loader component
 */
export class LoaderEl extends BaseEl<LoaderElProps> {
  @prop({ mapper: boolAttr, attribute: 'loading', reflect: true })
  loading: boolean;

  constructor() {
    super(true);
  }

  render() {
    return this.loading ? <span>Loading 3 seconds, please...</span> : <span>That's a loaded content!</span>;
  }
}

const Loader = define('demo-lit-loader', LoaderEl);

/**
 * The demo web component with lit-html render engine
 */
export class ConverterEl extends BaseEl {
  @prop()
  loading: boolean = true;

  constructor() {
    super(true);

    setInterval(() => {
      this.loading = !this.loading;
    }, 3000);
  }

  render() {
    return (
      <>
        ⌛<Loader loading={this.loading}></Loader>
      </>
    );
  }
}
