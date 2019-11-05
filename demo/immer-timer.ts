import produce, { applyPatches } from 'immer';
import { TemplateResult, html } from 'lit-html';
import { Define, AbstractElement, state } from 'abstract-element';
import litRender from 'abstract-element/render/lit';

let mapperTimer = setTimeout(() => {}, 10);
let stateChangesCache: any[] = [];

function mapper(state, key, value) {
  clearTimeout(mapperTimer);
  produce(
    state,
    draft => {
      draft[key] = value;
    },
    patches => {
      stateChangesCache.push(...patches);
    }
  );
  mapperTimer = setTimeout(() => {
    this.state = applyPatches(this.state, stateChangesCache);
    stateChangesCache.length = 0;
  }, 10);
  console.log('--------------------', key, value);
}

/**
 * The demo web component with lit-html render engine
 */
@Define('demo-immer-timer')
export class DemoImmerTimerComponent extends AbstractElement<TemplateResult> {
  @state(mapper)
  time1 = new Date().toLocaleTimeString();

  @state(mapper)
  time2 = new Date().toLocaleTimeString();

  @state(mapper)
  time3 = new Date().toLocaleTimeString();

  constructor() {
    super(litRender, true);

    // update the time each second
    setInterval(() => {
      this.time1 = new Date().toLocaleTimeString();
      this.time2 = new Date().toLocaleTimeString();
      this.time3 = new Date().toLocaleTimeString();
    }, 1000);
  }

  render() {
    console.log('!!!!!!!!! RENDER !!!!!!!!!');
    return html`
      <section>
        <div>${this.time1}</div>
        <div>${this.time2}</div>
        <div>${this.time3}</div>
      </section>
    `;
  }
}
