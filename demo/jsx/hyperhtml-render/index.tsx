import { define } from 'abstract-element';
import { WelcomeDialogEl } from './composition';
import { ConverterEl } from './converter';
import { TimerEl } from './Timer';
import { AttributesEl } from './attributes';
import { ImmerTimerEl } from './immer-timer';
import { BaseEl } from './base';

const WelcomeDialog = define('demo-hyper-html-welcome-dialog', WelcomeDialogEl);
const Converter = define('demo-hyper-html-converter', ConverterEl);
const Timer = define('demo-hyper-html-timer', TimerEl);
const Attributes = define('demo-hyper-html-attributes', AttributesEl);
const ImmerTimer = define('demo-hyper-html-immer-timer', ImmerTimerEl);

export interface TimeElProps {
  'data-demo': string;
}

/**
 * The demo web component with hyperHTML render engine
 */
export class DemoHyperEl extends BaseEl<TimeElProps> {
  render() {
    return (
      <>
        <Timer data-demo="Current time is rendering with hyperHTML:"></Timer>
        <WelcomeDialog></WelcomeDialog>
        <Converter></Converter>
        <Attributes></Attributes>
        <ImmerTimer></ImmerTimer>
      </>
    );
  }
}

define('demo-hyper', DemoHyperEl);
