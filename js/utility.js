const stringifyDate = (date) => {
  if (!date) return "undefined";

  const d = typeof date === 'number'
    ? new Date(date)
    : new Date(Date.parse(date));

  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const checkName = (name) => {
  let nameRegex = /^[A-Z]{1}[a-zA-Z\\s]{2,}$/;
  if (!nameRegex.test(name)) throw 'Name is incorrect';
}

const checkStartDate = (startDate) => {
  let now = new Date();
  if (startDate > now) throw 'Start date is a future date';
  var diff = Math.abs(now.getTime() - startDate.getTime());
  if (diff / (1000 * 60 * 60 * 24) > 30) throw 'Start date is beyond 30 days!';
}
