import styled from "styled-components";

const InputStyle = styled.input`
    height: 40px;
    width: 160px;
    margin: 0px 15px 30px 15px;
    padding-left: 10px;
    outline: none;
    font-size: 13px;
`;

const ShortInputField = ({ id, type, value, onChange, placeholder }) => {

    return(
        <InputStyle 
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
};

export default ShortInputField;