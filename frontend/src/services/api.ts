import { BACKEND_URL } from "../config"

export const createSlug = async (url: string, slug: string, description: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/urls/create-slug`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ url, slug, description })
    })

    if (!response.ok) {
      throw new Error('Failed to create slug')
    }

    const data = await response.json()

    return data

  } catch (error) {
    throw new Error(`Error shortening URL: ${error}`)
  }
}

export const deleteUser = async () => {

  try {

    const response = await fetch(`${BACKEND_URL}/users/delete-user/`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to delete user')
    }

    return await response.json()

  } catch (error) {
    throw new Error(`Error deleting user: ${error}`)
  }
}

export const getUserData = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/profile`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to get user data')
    }

    return await response.json()

  } catch (error) {
    throw new Error(`Error getting user data: ${error}`)
  }
}
