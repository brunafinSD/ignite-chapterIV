import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box
        mr="4"
        textAlign="right"
      >
        <Text>Bruna Fraga</Text>
        <Text color="gray.300" fontSize="small">bruna.f.n@hotmail.com</Text>
      </Box>
      <Avatar size="md" name="Bruna Fraga" src="https://github.com/brunafin.png" />
    </Flex>
  );
}