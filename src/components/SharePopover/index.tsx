import React, { useState } from "react";
import {
  Popover,
  Button,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  PopoverTrigger,
  Flex,
  Box,
  Switch,
  Image,
} from "@chakra-ui/react";
import { RiShareFill } from "react-icons/ri";
import { EarthIcon } from "icons";
import { GiHelp } from "react-icons/gi";
import { HiLink } from "react-icons/hi";
import { AccessMenu, SearchableSelect } from "components";

const SharePopover = (props: {
  data: Array<{
    type: string;
    label: string;
    email?: string;
    value: string;
    isInvited?: boolean;
    permissionVal?: number;
    members?: number | string;
    imageUrl?: string;
  }>;
  searchGroupLabels: Array<{ label: string; type: string }>;
  setData: Function;
  TriggerButton?: React.FC;
  isPopOpen?: boolean;
  onPopClose?: Function;
}) => {
  const {
    data,
    searchGroupLabels,
    setData,
    TriggerButton,
    isPopOpen,
    onPopClose,
  } = props;
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [selectedItems, setSelectedItems] = useState([]);

  const groupedData = searchGroupLabels.map((item) => {
    return {
      label: item.label,
      options: data.filter((oItem) => {
        return oItem.type === item.type && !oItem.isInvited;
      }),
    };
  });

  const onInviteHandler = (selectedArr, selectedPermission) => {
    const selectedVals = selectedArr.map((item) => item.value);
    setData((oldData) => {
      const newDataArr = [...oldData];
      newDataArr.forEach((item, i) => {
        if (selectedVals.includes(item.value)) {
          newDataArr[i].isInvited = true;
          newDataArr[i].permissionVal = selectedPermission;
        }
      });
      return newDataArr;
    });
  };

  const setPermissionHandler = (permissionVal, itemValues) => {
    setData((oldData) => {
      const oldDataArr = [...oldData];
      oldDataArr.forEach((item, i) => {
        if (itemValues.includes(item.value))
          oldDataArr[i] = { ...oldDataArr[i], permissionVal };
      });
      return oldDataArr;
    });
  };

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isPopOpen || isOpen}
      onClose={onPopClose ? () => onPopClose() : onClose}
      closeOnBlur={true}
      placement="bottom-start"
    >
      <PopoverTrigger>
        {TriggerButton ? (
          <TriggerButton />
        ) : (
          <Button
            mr={5}
            onClick={onToggle}
            sx={{
              borderRadius: "4px",
              display: "flex",
              align: "center",
              bg: "primary.400",
              width: "95px",
              h: "36px",
              color: "white",
              fontSize: "14px",
              fontWeight: "500",
              "&: hover": {
                bg: "primary.400",
              },
            }}
          >
            <Box mr={2}>Share</Box>
            <RiShareFill />
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent boxShadow="md" w="512px">
        <PopoverBody p={0}>
          <Box>
            <Flex
              p={3}
              borderBottom="1px solid "
              borderColor="gray.300"
              align="center"
            >
              <EarthIcon />
              <Flex justify="space-between" w="100%" align="center" ml={3}>
                <Box>
                  <Box fontSize="16px">Share to web</Box>
                  <Box color="gray.400" fontSize="14px">
                    Publish and share link with anyone
                  </Box>
                </Box>
                <Switch size="md" />
              </Flex>
            </Flex>

            <Box p={3} borderBottom="1px solid" borderColor="gray.300">
              <SearchableSelect
                groupedOptions={groupedData}
                setSelectedItems={setSelectedItems}
                onInvite={onInviteHandler}
                selectedItems={selectedItems}
              />
              {data.map((mapItem, i) =>
                mapItem?.isInvited ? (
                  <Box mt={3} key={"data-map-" + i + "-" + mapItem.value}>
                    <Flex align="center" justify="space-between">
                      <Flex align="center">
                        <Box>
                          <Image
                            boxSize="2rem"
                            borderRadius="full"
                            src={
                              mapItem?.imageUrl ||
                              "https://placekitten.com/100/100"
                            }
                            alt="Fluffybuns the destroyer"
                            mr="12px"
                          />
                        </Box>
                        <Box>
                          <Box fontSize="16px">{mapItem?.label}</Box>
                          <Box fontSize="14px" color="gray.400">
                            {mapItem?.type === "group"
                              ? mapItem?.members + " workplace members"
                              : ""}
                          </Box>
                        </Box>
                      </Flex>
                      <Box>
                        <AccessMenu
                          defaultPermissionVal={mapItem?.permissionVal}
                          selectedValues={[mapItem.value]}
                          setPermissionHandler={setPermissionHandler}
                        />
                      </Box>
                    </Flex>
                  </Box>
                ) : null
              )}
            </Box>

            <Flex
              p={3}
              bg="gray.100"
              align="center"
              justify="space-between"
              borderBottomRadius="4px"
            >
              <Flex align="center">
                <GiHelp color="#6B7280" />
                <Box fontSize="14px" color="gray.400" ml={2}>
                  learn about sharing
                </Box>
              </Flex>
              <Flex align="center">
                <HiLink />
                <Box fontSize="14px" fontWeight="500" ml={2}>
                  Copy link
                </Box>
              </Flex>
            </Flex>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export { SharePopover };
