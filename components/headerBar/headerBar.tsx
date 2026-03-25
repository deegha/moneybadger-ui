interface Props {
  actionButton?: React.ReactNode;
  middleSection?: React.ReactNode;
  title: string;
}

export function HeaderBar({ actionButton, middleSection, title }: Props) {
  return (
    <div className="bg-white w-full p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div>{middleSection && middleSection}</div>
      <div>{actionButton && actionButton}</div>
    </div>
  );
}
