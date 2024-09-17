import { UserData } from '../interfaces/UserData';
import Auth from '../utils/auth';

const retrieveUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

const createUser = async(body: Omit<UserData, 'id'>) => {
  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from data submission:', err);
    return null;
  }
}

export { retrieveUsers, createUser };
