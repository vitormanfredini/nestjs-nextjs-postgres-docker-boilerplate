import { getUsersService } from '@/data/services/auth-service'

export default async function usersRoute() {
  const response = await getUsersService()

  return (
    <div>
      <h1>asdawdad awd aw</h1>

      {response.data.map((item: any, index: number) => {
        return (
          <p key={index}>
            <b>{item.name}</b>
          </p>
        )
      })}
    </div>
  )
}
