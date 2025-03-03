export const login = async (email: string, password: string) => {
  try {
    const response = await fetch('https://api.example.com/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Login failed');
  }
};
