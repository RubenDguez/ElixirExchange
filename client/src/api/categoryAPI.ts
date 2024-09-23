export async function getAllCategories(jwt: string): Promise<Array<{ id: number; name: string }>> {
    const response = await fetch('/api/categories', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
    
      const data: Array<{ id: number; name: string }> = await response.json();
      return data;
}
