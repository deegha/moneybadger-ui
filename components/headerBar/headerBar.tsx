interface Props {
  actionButton?: React.ReactNode;
  middleSection?: React.ReactNode;
  title: string;
}

export function HeaderBar({ actionButton, middleSection, title }: Props) {
  return (
    <div className="flex w-full items-center justify-between bg-white p-5">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div>{middleSection && middleSection}</div>
      <div>{actionButton && actionButton}</div>
    </div>
  );
}
