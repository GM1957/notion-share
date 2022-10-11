import React, { useState } from "react";
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  ButtonProps,
} from "@chakra-ui/react";
import { IoChevronDown } from "react-icons/io5";
import { permissionMap } from "constant";

const AccessMenu = (props: {
  defaultPermissionVal?: number;
  setPermissionHandler?: Function;
  selectedValues?: Array<string>;
  buttonProps?: ButtonProps;
}) => {
  const {
    defaultPermissionVal,
    setPermissionHandler,
    selectedValues,
    buttonProps,
  } = props;
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [permissionVal, setPermissionVal] = useState(defaultPermissionVal || 1);
  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        as={Button}
        onClick={onToggle}
        rightIcon={<IoChevronDown />}
        fontSize="12px"
        size="sm"
        fontWeight="400"
        bg="white"
        {...buttonProps}
      >
        {
          permissionMap.find((item) => item.value === permissionVal)
            ?.displayName
        }
      </MenuButton>
      <MenuList fontSize="14px" px={2} minW="172px">
        {permissionMap.map((item, i) => {
          return (
            <MenuItem
              key={"menu-key-" + i + "-" + item.value}
              color={item.value === 4 ? "red" : ""}
              onClick={() => {
                setPermissionVal(item.value);
                if (setPermissionHandler) {
                  setPermissionHandler(item.value, selectedValues);
                }
              }}
            >
              {item?.displayName}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export { AccessMenu };
