type MeInfoProps = {
  name: string
  username: string
  email: string
}

export function MeInfo(props: MeInfoProps) {
  return (
    <>
      <h2 className="text-3xl mb-4">{props.name}</h2>
      <p>
        <b>Username:</b> {props.username}
      </p>
      <p>
        <b>Email:</b> {props.email}
      </p>
    </>
  )
}
