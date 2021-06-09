export const getChatTime = (date) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  return `${hour}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
};

export const getUidTime = (oldDate) => {
  const year = oldDate.getUTCFullYear();
  const month = oldDate.getMonth() + 1;
  const date = oldDate.getDate();
  const hour = oldDate.getHours();
  const minutes = oldDate.getMinutes();
  const second = oldDate.getSeconds();
  return `${year}${month}${date}${hour}${minutes}${second}`;
};

export const setDateChat = (oldDate) => {
  const year = oldDate.getUTCFullYear();
  const month = oldDate.getMonth() + 1;
  const date = oldDate.getDate();
  return `${year}-${month}-${date}`;
};
export const setDateChatMessage = (oldDate) => {
  const year = oldDate.getUTCFullYear();
  const month = oldDate.getMonth() + 1;
  const date = oldDate.getDate();
  return `${year}/${month}/${date}`;
};
