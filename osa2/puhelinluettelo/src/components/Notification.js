const Notification = ({ message }, isError = false) => {
  if (message == null) return null;
  return <div className={`notification`}>{message}</div>;
};

const Error = ({ message }) => {
  if (message == null) return null;
  return <div className={`error`}>{message}</div>;
};

export { Notification, Error };
