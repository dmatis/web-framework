import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  // deserialize is a fn takes in a json object and returns an instance of type T
  // ie: K is a UserProps json object, T would be a new User() built from K
  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  on = this.events.on;
  trigger = this.events.trigger;

  fetch(): void {
    axios.get(this.rootUrl)
      .then((response: AxiosResponse) => {
        this.models = response.data.map((value: K) => this.deserialize(value));
      })

      this.trigger('change');
  }
}
