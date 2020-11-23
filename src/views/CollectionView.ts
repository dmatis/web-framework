import { Collection } from '../models/Collection';

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    // clear current content
    this.parent.innerHTML = '';

    // create a fresh template element
    const templateElement = document.createElement('template');

    // for each model in the collection, render an HTML block that gets
    // appended to the newly created template
    for (let model of this.collection.models) {
      const itemParent = document.createElement('div');
      // call the renderItem() as implemented in child class and append to the template
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    // Append the entire generated template to the parent element passed to the CollectionView object
    this.parent.append(templateElement.content);
  }

}