import {
  DownloadIcon,
  HamburgerIcon,
  SearchIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiTrendingUp } from "react-icons/bi";
import { AiOutlineCompass, AiOutlineDownload, AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";

const Navbar = () => {
  const { pathname } = useLocation();
  console.log(pathname)
  return (
    <Flex
      pt="8"
      alignItems={"center"}
      justifyContent={"flex-start"}
      flexDirection="column"
      gap={10}
      height={"100%"}
      minWidth={"70px"}
      maxWidth={"70px"}
    >
      
      <Link to="/" >
        {" "}
        <Icon as={AiOutlineSearch} w={8} h={8} mb={"-3"} color={pathname === "/" ? "white" : "#9c9c9c"}/>
      </Link>
      <Link to="/explore" >
        {" "}
        <Icon as={AiOutlineCompass} w={8} h={8} mb={"-3"} color={pathname === "/explore" ? "white" : "#9c9c9c"}/>
      </Link>
      <Link to="/download" >
        {" "}
        <Icon as={AiOutlineDownload} w={8} h={8} mb={"-3"} color={pathname === "/download" ? "white" : "#9c9c9c"} />
      </Link>
      {/* <Link to="/setting" >
        {" "}
        <Icon as={AiOutlineSetting} w={8} h={8} mb={"-3"} color={pathname === "/setting" ? "white" : "#9c9c9c"} />
      </Link> */}
   
    </Flex>
  );
};

export default Navbar;
