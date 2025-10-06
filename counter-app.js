/**
 * Copyright 2025 elliebluejay
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 0;
    this.min = -10;
    this.max = 25;
    this.confettiTrigger = 21;

    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }



  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      counter: { type: Number},
      min: { type: Number},
      max: { type: Number},
      confettiTrigger: { type: Number, attribute: 'confetti-trigger' },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-default-link);
        background-color: var(--ddd-theme-default-linkLight);
        font-family: var(--ddd-font-primary);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      confetti.container {
        display: block;
      }
      h3 span {
        font-size: var(--counter-app-label-font-size, var(--ddd-lh-120));
      }

      .counter {
        font-size: var(--counter-app-counter-font-size, var(--ddd-lh-120));
        text-align: center;
        margin-bottom: var(--ddd-spacing-4);
        transition: color 0.3s ease-in-out;
        color: var(--ddd-theme-default-infoLightt);
      }

      .counter.min, .counter.max {
        color: var(--ddd-theme-default-original87Pink);
      }

      .counter.threshold-18 {
        color: var(--ddd-theme-default-athertonViolet);
      }
      .counter.threshold-21 {
        color: var(--ddd-theme-default-creekTeal);
      } 

      .buttons {
        display: flex;
        justify-content: center;
        gap: var(--ddd-spacing-3);
      }

      button {
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-s);
          border: var(--ddd-border-xs);
          border-radius: var(--ddd-radius-sm);
          cursor: pointer;
          background: var(--ddd-theme-default-creekTeal);
          color: var(--ddd-theme-default-white); 
          transition: background-color 0.3s ease;
        } 
      button:hover:not(:disabled),
        button:focus:not(:disabled) {
          background: var(--ddd-theme-default-creekTeal);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          outline: none;
        }

        button:disabled {
          background-color: var(--ddd-theme-default-disabled);
          color: var(--ddd-theme-default-white);
          opacity: 0.2;
          cursor: not-allowed;
        }
      `,  
    ];
  }

    render() {
    return html`
      <div class="wrapper">
        <confetti-container id="confetti">
          <div class="counter ${this._getThresholdClass()}">${this.counter}</div>
          <div class="buttons">
            <button
              @click=${this._decrement}
              ?disabled=${this.counter === this.min}
            >
              -1
            </button>
            <button
              @click=${this._increment}
              ?disabled=${this.counter === this.max}
            >
              +1
            </button>
          </div>
        </confetti-container>
      </div>
    `;
  }

  _increment = () => {
    if (this.counter < this.max) {
      this.counter += 1;
    }
  };

  _decrement = () => {
    if (this.counter > this.min) {
      this.counter -= 1;
    }
  };

  _getThresholdClass() {
    if (this.counter === this.min || this.counter === this.max) {
      return 'max';
    }
    if (this.counter === 21) {
      return 'threshold-21';
    }
    if (this.counter === 18) {
      return 'threshold-18';
    }
    return '';
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }

    if (changedProperties.has('counter')) {
      console.log(`${this.counter}, ${this.confettiTrigger}`);
      if (this.counter === this.confettiTrigger) {
        this.makeItRain();
      }
    }
  }



  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        this.shadowRoot
          .querySelector("#confetti")
          .setAttribute("popped", "");
      }, 0);
    });
  }

  /* // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <confetti-container id="confetti"></confetti-container>
        <div class="counter">21</div>
          <div class="buttons">
            <button>-1</button>
            <button>+1</button>
        </div>
    </div>

    `;
  } */
/* <div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>
  <slot></slot>
</div> */
  

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);