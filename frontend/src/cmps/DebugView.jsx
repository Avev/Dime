export const DebugView = ({ data }) => {
  return process.env.NODE_ENV === 'development' ? (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  ) : null;
};
