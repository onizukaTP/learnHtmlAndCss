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
