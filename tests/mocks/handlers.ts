import { HttpResponse, http } from 'msw'

const mockAnimals = [
    {
      id: 1,
      name: 'Ferret',
      awesome: 'Maybe',
    },
    {
      id: 2,
      name: 'Chupacabra',
      awesome: 'Yes',
    },
  ];

export const handlers = [
  http.get("*/v2/animals", () => {
    return HttpResponse.json(mockAnimals, { headers: { 'ignore-me': 'please' } })
  })
]