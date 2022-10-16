import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import {
  DirectoryMenuItem,
  DirectoryMenuState,
} from "../../../atoms/DirectoryMenuAtom";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(DirectoryMenuState);

  const communityStateValue = useRecoilState(communityState);

  const router = useRouter();

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    router.push(menuItem.link);

    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue[0];

    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          ImageURL: currentCommunity.imageURL,
          icon: FaReddit,
          iconColor: "blue.500",
        },
      }));
    }
  }, [communityStateValue[0].currentCommunity]);

  return {
    directoryState,
    toggleMenuOpen,
    onSelectMenuItem,
  };
};
export default useDirectory;
