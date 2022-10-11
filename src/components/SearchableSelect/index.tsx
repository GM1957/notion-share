import React, { useState } from "react";
import { Flex, Box, Button } from "@chakra-ui/react";
import ReactSelect, { components } from "react-select";
import { AccessMenu } from "components";

const IndicatorsContainer = () => null;

const IndicatorSeparator = () => null;

const SelectMenuList = (props: any) => {
  return (
    <components.MenuList {...props}>
      <Box p={2}>{props.children}</Box>
    </components.MenuList>
  );
};

const GroupHeading = (props: any) => (
  <components.GroupHeading {...props}>
    <Box color="black" fontSize="16px" fontWeight="500">
      {props.children}
    </Box>
  </components.GroupHeading>
);

const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <Flex align="center">
        <Flex
          mr={2}
          bg="gray.400"
          fontSize="14px"
          borderRadius="5px"
          color="white"
          h="100%"
          px={2}
        >
          {props?.data?.label[0]}
        </Flex>
        <Box>{props?.data?.label}</Box>
      </Flex>
    </components.Option>
  );
};

const SearchableSelect = (props: {
  groupedOptions: Array<{
    label: string;
    options: Array<Object>;
  }>;
  onInvite: Function;
  setSelectedItems: Function;
  selectedItems: Array<Object>;
}) => {
  const { groupedOptions, onInvite, setSelectedItems, selectedItems } = props;
  const [permissionVal, setPermissionVal]: any = useState(1);
  return (
    <Flex>
      <Box flex="100%">
        <ReactSelect
          isMulti
          name="colors"
          options={groupedOptions}
          placeholder="People, emails, groups"
          closeMenuOnSelect={false}
          value={selectedItems}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "42px",
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              border: "1px solid #D1D5DB",
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            }),
            option: (base, { data, isDisabled, isFocused, isSelected }) => ({
              ...base,
              backgroundColor: isFocused ? "#F3F4F6" : "transparent",
            }),
          }}
          components={{
            IndicatorSeparator,
            IndicatorsContainer,
            MenuList: SelectMenuList,
            GroupHeading,
            Option,
          }}
          onChange={(selectedArr) => {
            setSelectedItems(selectedArr);
          }}
        />
      </Box>
      <Flex bg="gray.100">
        <Flex
          align="center"
          sx={{
            borderTopRightRadius: "6px",
            borderBottomRightRadius: "6px",
            borderRight: "1px solid #D1D5DB",
            borderBottom: "1px solid #D1D5DB",
            borderTop: "1px solid #D1D5DB",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            h: "100%",
          }}
        >
          <Flex justify="center" align="center">
            {selectedItems.length > 0 ? (
              <AccessMenu
                setPermissionHandler={(permission) => {
                  setPermissionVal(permission);
                }}
              />
            ) : null}

            <Button
              onClick={() => {
                if (selectedItems.length > 0) {
                  onInvite(selectedItems, permissionVal);
                }
                setSelectedItems([]);
              }}
              fontSize="16px"
              fontWeight="500"
              color="gray.500"
            >
              Invite
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { SearchableSelect };
