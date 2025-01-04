import { BACKEND_URL } from "../constants"
import { toast } from "sonner"

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

    if (response.ok) {
      return await response.json()
    }

    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create slug')

  } catch (error) {
    throw new Error(`Error shortening URL: ${error}`)
  }
}

export const deleteSlug = async (slug: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/urls/delete-slug/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug })
    })

    if (response.ok) {
      return await response.json()
    }

    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to delete slug')
  }

  catch (error) {
    console.error(error)

    toast.error(`Error deleting slug: ${error}`)
    throw error
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

export const updateUserData = async (data: { first_name: string, last_name: string }) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/update-profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    const responseData = await response.json()

    if (responseData.status !== 'success') {
      throw new Error(responseData.message || 'Failed to update user data');
    }

    return responseData;

  } catch (error) {
    throw new Error(`Error updating user data: ${(error as Error).message}`)
  }
}

