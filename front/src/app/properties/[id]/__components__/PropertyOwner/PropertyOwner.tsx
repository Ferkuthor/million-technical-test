import Image from "next/image";

interface PropertyOwnerProps {
  owner: {
    name: string;
    address: string;
    photo: string;
    birthday: Date;
  };
}

export function PropertyOwner({ owner }: PropertyOwnerProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
      <div className="flex items-center space-x-4">
        <Image
          src={owner.photo}
          alt={owner.name}
          width={128}
          height={128}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{owner.name}</p>
          <p className="text-sm text-muted-foreground">{owner.address}</p>
          <p className="text-sm text-muted-foreground">
            {owner.birthday.toLocaleDateString("en-US")}
          </p>
        </div>
      </div>
    </div>
  );
}
