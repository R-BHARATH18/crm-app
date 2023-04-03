interface Props {
  leadStatus: string;
}

export default function LeadStatusBadge({ leadStatus }: Props) {
  return (
    <span className="text-xs rounded-xl bg-red-900  py-0.5 px-2 text-center border uppercase">
      {leadStatus}
    </span>
  );
}
