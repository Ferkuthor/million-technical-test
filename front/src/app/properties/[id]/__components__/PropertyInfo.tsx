interface PropertyInfoProps {
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
}

export function PropertyInfo({ name, address, price, codeInternal, year }: PropertyInfoProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-lg text-muted-foreground">{address}</p>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-secondary">${price.toLocaleString()}</p>
        <div className="text-right text-sm text-muted-foreground">
          <p>Code: {codeInternal}</p>
          <p>Year: {year}</p>
        </div>
      </div>
    </div>
  );
}