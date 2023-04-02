import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Marcos Duarte</Text>
        <Text color="gray.300" fontSize="small">
          marcosduarte1994@gmail.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Marcos Duarte"
        src="https://github.com/MarkDuarte.png"
      />
    </Flex>
  )
}
