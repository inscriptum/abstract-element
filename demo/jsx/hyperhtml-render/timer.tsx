import { prop } from 'abstract-element';
import { BaseEl } from './base';

export interface TimerElProps {
  'data-demo': string;
}

export class TimerEl extends BaseEl<TimerElProps> {
  static prop = (attrName?: keyof TimerElProps) => prop({ attribute: attrName });

  @TimerEl.prop('data-demo')
  dataDemo: string;

  @TimerEl.prop()
  time = new Date().toLocaleTimeString();

  constructor() {
    super(true);

    // update the time each second
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
  }

  render() {
    return (
      <section>
        <p>{this.dataDemo}</p>
        <p>{this.time}</p>
      </section>
    );
  }
}
