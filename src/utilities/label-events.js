import DateFormat from './date-format';

export default class LabelEvents {
  constructor(labelEvents) {
    this.events = labelEvents;
    this.groupEvents();
  }

  groupEvents() {
    this.groups = this.events.reduce((groups, event) => {
      const dateFormat = new DateFormat(event.timestamp);
      const date = dateFormat.getDate();
      const existingEvents = groups[date] || [];
      return Object.assign({}, groups, { [dateFormat.getDate()]: existingEvents.concat(event) });
    }, {});
  }

  getEventGroups() {
    return Object
      .keys(this.groups)
      .map((date) => new Date(this.groups[date][0].timestamp)) // avoid timezone confusion
      .sort((a, b) => b.getTime() - a.getTime())
      .map((date) => this.groups[new DateFormat(date).getDate()]);
  }
}
