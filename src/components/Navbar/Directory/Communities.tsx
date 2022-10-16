import { MenuItem, Flex, Icon, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import CreateCommunityModal from "../../../Modal/Auth/CreateCommunity/CreateCommunityModal";
import MenuListItem from "./MenuListItem";

type CommunityProps = {};

const Community: React.FC<CommunityProps> = () => {
  const [open, setOpen] = useState(false);

  const mySnippets = useRecoilValue(communityState).mySnippets;

  mySnippets
    .filter((snippet) => snippet.isModerator)
    .map((snippet) => {
      console.log("mod:", snippet);
    });
  return (
    <>
      <CreateCommunityModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MODERATING
        </Text>

        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={FaReddit}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor="brand.100"
              ImageURL={snippet.imageURL}
            />
          ))}
      </Box>

      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MY COMMUNITIES
        </Text>

        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bf: "gray.100" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={GrAdd} />
            Create Community
          </Flex>
        </MenuItem>

        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="blue.500"
            ImageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};
export default Community;
