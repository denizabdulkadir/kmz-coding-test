import axios from 'axios'

const API_URL = 'https://apiv5.akilliticaretim.com/api/v5/sf/auth/login'

export async function login(username: string, password: string) {
  const response = await axios.post(
    API_URL,
    {
      username,
      password,
    },
    {
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
        'Content-Type': 'application/json',
      },
    },
  )
  return response.data
}
