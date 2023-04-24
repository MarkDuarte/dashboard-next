import { useQuery } from 'react-query'
import { api } from '../api'

type UserProps = {
  id: string
  name: string
  email: string
  createdAt: string
}

export async function getUsers(): Promise<UserProps[]> {
  const { data } = await api.get('users')

  const users = data.users.map(({ id, name, email, createdAt }: UserProps) => {
    return {
      id,
      name,
      email,
      createdAt: new Date(createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return users
}

export function useUsers() {
  return useQuery(
    'users',
    getUsers,

    {
      staleTime: 1000 * 5,
    },
  )
}
