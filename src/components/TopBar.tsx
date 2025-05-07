import { useLocation, useNavigate, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { IoHomeOutline, IoHeartOutline, IoArrowBack } from "react-icons/io5";

const TopBarWrapper = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: white;
  z-index: 100;
`;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100%;
  max-width: 540px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const IconGroup = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 100;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  color: #333;

  &:hover {
    color: #666;
  }
`;

const Title = styled.h1`
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  font-size: 1.2rem;
  margin: 0;
  flex: 1;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`;

export const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLikedPage = location.pathname === "/liked";

  return (
    <TopBarWrapper>
      <TopBarContainer>
        <IconGroup>
          {isLikedPage ? (
            <IconButton onClick={() => navigate(-1)}>
              <IoArrowBack />
            </IconButton>
          ) : null}
        </IconGroup>
        <Title>{isLikedPage ? "내가 찜한 상품" : "쇼핑 리스트"}</Title>
        <IconGroup>
          {!isLikedPage && (
            <StyledLink to="/liked">
              <IconButton>
                <IoHeartOutline />
              </IconButton>
            </StyledLink>
          )}
          <StyledLink to="/">
            <IconButton>
              <IoHomeOutline />
            </IconButton>
          </StyledLink>
        </IconGroup>
      </TopBarContainer>
    </TopBarWrapper>
  );
};
