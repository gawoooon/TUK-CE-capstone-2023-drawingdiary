import styled from "styled-components";

const InputStyle = styled.input`
    height: 40px;
    width: 420px;
    padding-left: 10px;
    outline: none;
    font-size: 13px;
`;

const LongInputField = ({ id, type, value, onChange, placeholder }) => {

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

export default LongInputField;