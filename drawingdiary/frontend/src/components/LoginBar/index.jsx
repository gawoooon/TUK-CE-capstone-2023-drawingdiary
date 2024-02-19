import styled from "styled-components";

const Bar = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 50px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
  font-size: 24px;
  color: #4d4d4d;
`;

const TextBox = styled.input`
  display: flex;
  align-items: center;
  width: 80%;
  height: 100%;
  color: #989898;
  border: none;
  outline: none;
  padding: 0 20px;
  background-color: transparent;
  font-size: 16px;
  font-weight: 800;
  opacity: 0.5;
`;

function LoginBar({ icon, text, onChange, type="text" }) {
  return (
    <Bar>
      <IconBox>{icon}</IconBox>
      <TextBox type={text} placeholder={text} onChange={onChange} />
    </Bar>
  );
}

export default LoginBar;
