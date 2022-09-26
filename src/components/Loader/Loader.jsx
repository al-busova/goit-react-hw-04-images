import { Hearts } from 'react-loader-spinner';

export const Loader =() => {
     return <Hearts 
  height="180"
  width="180"
  color="#4fa94d"
  ariaLabel="hearts-loading"
  wrapperStyle={{justifyContent: 'center'}}
  wrapperClass=""
  visible={true}
/>   
  ;
}
    

