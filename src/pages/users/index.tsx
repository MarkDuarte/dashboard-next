import Link from 'next/link'
import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tr,
  Th,
  Checkbox,
  Thead,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react'

import { RiAddLine, RiEditLine } from 'react-icons/ri'

import { Pagination } from '@/components/Pagination'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '../../components/Header'
import { useUsers } from '@/services/hooks/useUsers'

export default function UserList() {
  const { data, isLoading, error } = useUsers()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const [isChecked, setIsChecked] = useState(false)

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={6}>
        <Sidebar />

        <Box flex={1} borderRadius={8} bg="gray.800" p={8}>
          <Flex mb={8} justifyContent="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <Link href="/users/create">
              <Button
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
              >
                Criar Novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width={8}>
                      <Checkbox
                        colorScheme="pink"
                        isChecked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data Cadastro</Th>}
                    <Th width={8}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item) => (
                    <Tr key={item.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{item.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {item.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{item.createdAt}</Td>}
                      <Td>
                        {isWideVersion && (
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiEditLine} fontSize={20} />}
                          >
                            Editar
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
