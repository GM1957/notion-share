import React from "react";
import { SharePopover } from "components";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { theme } from "configs";
import oData from "db/data.json";

function App() {
  const [data, setData] = React.useState(oData);
  return (
    <ChakraProvider theme={theme}>
      <Box ml={10} mt={10}>
        <SharePopover
          data={data}
          searchGroupLabels={[
            { label: "Select a group", type: "group" },
            { label: "Select a person", type: "person" },
          ]}
          setData={setData}
        />
      </Box>
    </ChakraProvider>
  );
}

export default App;
