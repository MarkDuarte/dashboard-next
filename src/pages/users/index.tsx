import NextLink from 'next/link'
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
  Link,
} from '@chakra-ui/react'

import { RiAddLine, RiEditLine } from 'react-icons/ri'

import { Pagination } from '@/components/Pagination'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '../../components/Header'
import { useUsers } from '@/services/hooks/useUsers'
import { queryClient } from '@/services/QueryClient'
import { api } from '@/services/api'

export default function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const [isChecked, setIsChecked] = useState(false)

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`)

        return response.data
      },
      {
        staleTime: 1000 * 60 * 10,
      },
    )
  }

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
            <NextLink href="/users/create">
              <Button
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
              >
                Criar Novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading && isFetching ? (
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
                  {data.users.map((item) => (
                    <Tr key={item.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(item.id)}
                          >
                            <Text fontWeight="bold">{item.name}</Text>
                          </Link>
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
              <Pagination
                totalCountOfRegister={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
