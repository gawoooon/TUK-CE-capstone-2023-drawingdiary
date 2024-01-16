import styled from "styled-components";

const InputStyle = styled.input`
    height: 40px;
    width: 420px;
    padding-left: 10px;
    border: 1px solid #909090;
    border-radius: 10px;
`;

const LongInputField = ({ id, type, value, onChange, placeHolder }) => {

    return(
        <InputStyle
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
        />
    )
};

export default LongInputField;