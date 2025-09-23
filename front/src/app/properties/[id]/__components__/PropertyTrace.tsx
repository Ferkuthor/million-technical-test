interface PropertyTraceProps {
  trace: { dateSale: Date; name: string; value: number; tax: number }[];
}

export function PropertyTrace({ trace }: PropertyTraceProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
      <div className="space-y-4">
        {trace.map((item, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.dateSale.toLocaleDateString("en-US")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${item.value.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">
                  Tax: ${item.tax.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}