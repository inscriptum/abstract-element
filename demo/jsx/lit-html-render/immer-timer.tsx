import produce, { applyPatches } from 'immer';
import { prop } from 'abstract-element';
import { BaseEl } from './base';

let mapperTimer = setTimeout(() => {}, 10);
let stateChangesCache: any[] = [];

function mapper(state, key, value) {
  clearTimeout(mapperTimer);
  produce(
    state,
    (draft) => {
      draft[key] = value;
    },
    (patches) => {
      stateChangesCache.push(...patches);
    }
  );
  mapperTimer = setTimeout(() => {
    this.state = applyPatches(this.state, stateChangesCache);
    stateChangesCache.length = 0;
  }, 10);
  console.log('--------------------', key, value);
}

export class ImmerTimerEl extends BaseEl {
  static prop = () => prop({ mapper });

  @ImmerTimerEl.prop()
  time1 = new Date().toLocaleTimeString();

  @ImmerTimerEl.prop()
  time2 = new Date().toLocaleTimeString();

  @ImmerTimerEl.prop()
  time3 = new Date().toLocaleTimeString();

  constructor() {
    super(true);

    // update the time each second
    setInterval(() => {
      this.time1 = new Date().toLocaleTimeString();
      this.time2 = new Date().toUTCString();
      this.time3 = new Date().toISOString();
    }, 1000);
  }

  render() {
    console.log('!!!!!!!!! RENDER !!!!!!!!!');
    return (
      <section>
        <div>
          LocaleTimeString: <i>{this.time1}</i>
        </div>
        <div>
          UTCString: <i>{this.time2}</i>
        </div>
        <div>
          ISOString: <i>{this.time3}</i>
        </div>
      </section>
    );
  }
}
