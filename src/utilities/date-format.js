const Days = ['Sunday', 'Monday', 'Tuesday',
                'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const Months = ['Jan', 'Feb', 'Mar',
                  'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep',
                  'Oct', 'Nov', 'Dec'];

export default class DateFormat {
  constructor(rawDate) {
    this.date = new Date(rawDate);
  }

  getDate() {
    const day = Days[this.date.getDay()];
    const month = Months[this.date.getMonth()];
    const date = this.date.getDate();
    return `${day}, ${month} ${date}`;
  }

  getDateYear() {
    return `${this.getDate()} ${this.date.getFullYear()}`;
  }

  getTime() {
    const hours = this.date.getHours();
    const minutes = this.date.getMinutes();
    const hoursFormatted = hours.toString().length === 1 ? `0${hours}` : hours;
    const minutesFormatted = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    return `${hoursFormatted}:${minutesFormatted}`;
  }
}
