export function ZodErrors({ errors }: { errors: string[] | undefined }) {

  if (!errors) return null;

  return errors.map((err: string, index: number) => (
    <div key={index} className="text-red-500 text-xs italic mt-1 py-2">
    {err}
    </div>
  ));

}