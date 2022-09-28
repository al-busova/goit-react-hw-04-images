import { Hearts } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Hearts
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="hearts-loading"
      wrapperStyle={{ justifyContent: 'center' }}
      wrapperClass=""
      visible={true}
    />
  );
};
