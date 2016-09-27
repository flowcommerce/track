import DateFormat from './date-format';

export default class LabelEvents {
  constructor(labelEvents) {
    this.labels = labelEvents;
    this.groupEvents();
  }

  groupEvents() {
    const events = this.getEvents();
    this.groups = events.reduce((groups, event) => {
      const dateFormat = new DateFormat(event.timestamp);
      const date = dateFormat.getDate();
      const existingEvents = groups[date] || [];
      return Object.assign({}, groups, { [dateFormat.getDate()]: existingEvents.concat(event) });
    }, {});
  }

  getEvents() {
    return this.labels.reduce((events, label) => events.concat(label.events), []);
  }

  getLabelEstimatedDeliveryDate() {
    if (this.labels.length > 0) {
      return this.labels[0].delivery_estimate;
    }

    return undefined;
  }

  getEventGroups() {
    return Object
      .keys(this.groups)
      .map((date) => new Date(this.groups[date][0].timestamp)) // avoid timezone confusion
      .sort((a, b) => b.getTime() - a.getTime())
      .map((date) => this.groups[new DateFormat(date).getDate()]);
  }
}
