import Image from "next/image";

interface Props {
  name: string;
  size: number;
}

export default function CustomerAvatar({ name, size }: Props) {
  return (
    <Image
      src={`https://ui-avatars.com/api/?name=${name}&size=128&background=random`}
      alt={`User Avatar for ${name}`}
      width={size}
      height={size}
      className="rounded-full shadow-inner object-cente"
    />
  );
}
