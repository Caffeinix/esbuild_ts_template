import { LitElement, html, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sample-element")
export class SampleElement extends LitElement {
    override render(): TemplateResult {
        return html`This is rendering from a lit element!`;
    }
}
