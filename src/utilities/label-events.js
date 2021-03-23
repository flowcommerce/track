import DateFormat from './date-format';

function getEventGroups(eventGroups) {
  return Object
    .keys(eventGroups)
    .map((date) => new Date(eventGroups[date][0].timestamp)) // avoid timezone confusion
    .sort((a, b) => b.getTime() - a.getTime())
    .map((date) => eventGroups[new DateFormat(date).getDate()]);
}

export function groupEvents(labels) {
  return labels.map((label) => {
    const eventGroups = label.events.reduce((groups, event) => {
      const dateFormat = new DateFormat(event.timestamp);
      const date = dateFormat.getDate();
      const existingEvents = groups[date] || [];
      return {
        ...groups,
        [dateFormat.getDate()]: existingEvents.concat(event),
      };
    }, {});
    return {
      ...label,
      eventGroups: getEventGroups(eventGroups),
    };
  });
}

export function getLabelEstimatedDeliveryDate(labels) {
  if (labels.length > 0) {
    return labels[0].delivery_estimate;
  }

  return undefined;
}
