import styled from "styled-components";

const Dd = styled.div`
  background-color: red;
  width: 100%;
  height: 100%;
`;

function FalseComponent() {
  return <Dd>false</Dd>;
}

export default FalseComponent;
