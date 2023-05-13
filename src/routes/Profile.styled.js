import styled from "styled-components";

export const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin: auto;
`;

export const SweetContainer = styled.section`
  height: 365px;
  overflow: scroll;
`;

export const Nav = styled.nav`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
`;

export const UserDisplayName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 10px;
  margin-top: 10px;
`;

export const UserProfile = styled.section`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
`;

export const UpdateBtn = styled.div`
  text-align: end;
  position: relative;
  top: 25px;

  button {
    text-align: right;
    padding: 5px 10px;
    border-radius: 10px;

    &:hover {
      background-color: #04aaff;
      color: white;
    }
  }
`;
