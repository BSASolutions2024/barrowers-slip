export function toJSONLocal(date:any) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

export function formatDateStandard(date:any){
  const parsedDate = date instanceof Date ? date : new Date(date);
  const options:{} = { year: 'numeric', month: 'long', day: 'numeric' };
  return parsedDate.toLocaleDateString('en-US', options);
}

export function formatDateReadable (date:any) {
  const new_date = new Date(date);
  return new_date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};
