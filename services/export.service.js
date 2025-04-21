export const convertToCSV = (data) => {
  if (data.length === 0) return "";
  
  const headers = Object.keys(data[0]._doc || data[0]).join(",");
  const rows = data.map(item => {
    const values = Object.values(item._doc || item).map(val => {
      if (val instanceof Date) return val.toISOString();
      return `"${val}"`;
    });
    return values.join(",");
  });

  return [headers, ...rows].join("\n");
};
