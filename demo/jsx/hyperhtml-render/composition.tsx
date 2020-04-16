import { prop, define } from 'abstract-element';
import { BaseEl } from './base';
import hyperHTML from 'hyperhtml/esm';

export interface FancyBorderElProps {
  color: string;
  xml?: any;
}

export class FancyBorderEl extends BaseEl<FancyBorderElProps> {
  @prop({attribute: 'color'})
  color: string;

  constructor() {
    super(true);
  }

  render() {
    return (
      <>
        {hyperHTML.wire()`
          <style>
            .fancy-border {
              border: 1px solid;
            }
            .fancy-border_blue {
              border-color: blue;
            }
          </style>
        `}
        <div class={'fancy-border fancy-border_' + this.color}>
          <slot></slot>
        </div>
      </>
    );
  }
}


const FancyBorder = define('demo-hyper-fancy-border', FancyBorderEl);

export class WelcomeDialogEl extends BaseEl {
  static prop = (attrName?: keyof FancyBorderElProps) => prop({ attribute: attrName });

  constructor() {
    super(true);
  }

  render() {
    return (
      <FancyBorder onclick={() => console.log("clicked!")} color={"blue"}>
        <h1 class="Dialog-title">Welcome</h1>
        <p class="Dialog-message">Thank you for visiting our spacecraft!</p>
      </FancyBorder>
    );
  }
}
