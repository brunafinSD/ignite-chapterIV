import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box
          mr="4"
          textAlign="right"
        >
          <Text>Bruna Fraga</Text>
          <Text color="gray.300" fontSize="small">bruna.f.n@hotmail.com</Text>
        </Box>
      )}
      <Avatar size="md" name="Bruna Fraga" src="https://github.com/brunafin.png" />
    </Flex>
  );
}