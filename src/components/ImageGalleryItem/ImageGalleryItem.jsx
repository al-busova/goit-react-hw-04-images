// import PropTypes from "prop-types";
import { Image} from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ url}) => {
     return (
         <div>
                 <Image src={url} alt="" />
   </div>
  );
}

// ImageGalleryItem.propTypes = {
//     name: PropTypes.string.isRequired,
//     number: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     deleteContact: PropTypes.func.isRequired
// };