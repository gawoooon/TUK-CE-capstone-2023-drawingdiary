import styled, { css } from "styled-components";
import { MdCheckCircle, MdClear } from "react-icons/md";

const Bar = styled.div`
  display: flex;
  width: 300px;
  height: 48px;
  margin: 5px 0;
  background-color: rgba(237, 237, 237, 0.8);
  border-radius: 10px;
  padding-right: 20px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
  color: #848484;

  ${(props) =>
    !props.hasIcon &&
    css`
      display: none;
    `}
`;

const TextBox = styled.input`
  display: flex;
  align-items: center;
  width: ${(props) => (props.hasIcon ? "80%" : "100%")};
  height: 100%;
  color: #0d0d0d;
  border: none;
  outline: none;
  padding: 0 20px;
  background-color: transparent;
  font-size: 14px;
  opacity: 0.7;
`;

// 인증 문구
const CheckIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 90%;
  color: green;
`;

function LoginBar({ icon, text, onChange, type, phoneNumber, verifyMessage }) {
  // 이모티콘
  function VerificationIcon({ isValid }) {
    if (phoneNumber === undefined) return null; 
    if (isValid === null) return null;
    return (
      <CheckIconBox>
        {isValid ? (
          <MdCheckCircle size={16} color="green" />
        ) : (
          <MdClear size={16} color="red" />
        )}
      </CheckIconBox>
    );
  }

  return (
    <Bar>
      <IconBox hasIcon={!!icon}>{icon}</IconBox>
      <TextBox type={type} placeholder={text} onChange={onChange} hasIcon={!!icon} />
      <VerificationIcon isValid={verifyMessage} />
    </Bar>
  );
}

export default LoginBar;
