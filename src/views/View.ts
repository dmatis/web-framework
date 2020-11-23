import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {}

  abstract template(): string;

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  regionsMap(): { [key: string]: string} {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  };

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    })
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => element.addEventListener(eventName, eventsMap[eventKey]))
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    // clear the existing content within the parent element
    this.parent.innerHTML = '';

    // Create a template element with the above template string
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    // Add eventListeners (as stated in the eventsMap) to the appropriate selectors found in the template content.
    this.bindEvents(templateElement.content);

    // Populate the 'regions' attribute with the location of regions (where we want to nest a View) defined in regionsMap
    this.mapRegions(templateElement.content);

    // Nest all the views based on the 'regions' attribute
    this.onRender();

    // Append the template content to the parent element
    this.parent.append(templateElement.content);
  }
}