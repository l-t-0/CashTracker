import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layout";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Settings from "./Components/Settings/Settings";
import { useState } from "react";
import { useGlobalContext } from "./context/globalContext";

function App() {
  const [active, setActive] = useState(1);
  const [activeTitle, setActiveTitle] = useState("Dashboard");

  const global = useGlobalContext();

  const titleLookup = {
    1: "Dashboard",
    2: "Income",
    3: "Expenses",
    4: "Settings",
  };

  const handleNavChange = (value) => {
    setActive(value);
    setActiveTitle(titleLookup[value]);
  };

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Income />;
      case 3:
        return <Expenses />;
      case 4:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppStyled bg={bg} className="App">
      <MainLayout>
        <Navigation active={active} setActive={handleNavChange} />
        <ContentWrapper>
          <HeaderContainer>
            <h1>{activeTitle}</h1>
          </HeaderContainer>
          <PageContent>{displayData()}</PageContent>
        </ContentWrapper>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
`;

const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const HeaderContainer = styled.div`
  background: rgba(252, 246, 249, 0.78);
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  height: 11.315rem;
  overflow-x: hidden;
  text-align: center;
  border: 3px solid #ffffff;
  border-radius: 32px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: rgba(24, 24, 78, .6);
    font-size: 5.5rem;
    font-weight: bold;
    letter-spacing: 0.01em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  }
`;

const PageContent = styled.div`
  background: rgba(252, 246, 249, 0.78);
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;

  flex: 1;
  border: 3px solid #ffffff;
  border-radius: 32px;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default App;
