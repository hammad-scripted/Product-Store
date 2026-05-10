import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage.jsx';
import { CreatePage } from './pages/CreatePage.jsx';
import { Navbar } from './components/Navbar.jsx';
const App = () => {
  return (
    <Box minH={'100vh'}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/create" element={<CreatePage></CreatePage>}></Route>
      </Routes>
    </Box>
  );
};

export default App;
