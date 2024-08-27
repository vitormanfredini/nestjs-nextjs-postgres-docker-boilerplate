export function BackendErrors({ errors }: { errors: string[] }) {

  if (!errors) return null;

  return errors.map((err: string, index: number) => (
    <div key={index} className="text-red-500 text-xs italic mt-1 py-2">
    {err}
    </div>
  ));

}
