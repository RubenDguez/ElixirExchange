export async function createDrink(drink: IMyDrink, jwt: string) {
  const response = await fetch('/api/drink', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(drink),
  });

  const data = await response.json();
  return data;
}
