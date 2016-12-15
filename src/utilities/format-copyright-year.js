/**
 * Returns copyright year to be displayed.
 * @param {String|Number} startYear Starting copyright year.
 * @return {String} Copyright year to be displayed. If start year is before
 * current year, then a range is returned (e.g. `2016 - 2019`).
 */
export default function formatCopyrightYear(startYear = 'auto') {
  const currentYear = new Date().getFullYear();

  if (startYear === 'auto') {
    return `${currentYear}`;
  }

  const initialYear = parseInt(startYear, 10);

  if (initialYear === currentYear) {
    return `${initialYear}`;
  }

  if (initialYear < currentYear) {
    return `${initialYear} - ${currentYear}`;
  }

  return `${currentYear}`;
}
