import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Star = ({ stars}) => {
    
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        
        return (
            <span key={index}>
                {stars >= index + 1 ? (
                    <FaStar className="icon" />
                ) : stars >= number ? (
                    <FaStarHalfAlt className="icon" />
                ) : (
                    <AiOutlineStar className="icon" />
                )}
            </span>
        );
    });

    return (
        <Wrapper>
            <div className="icon-style">
                {ratingStar}
               
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
 
  .icon-style {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    .icon {
      margin: 0;
      color:#39A1AE;
      font-size: calc(.2em + 1vw);
      
    }

  }
`;

export default Star;