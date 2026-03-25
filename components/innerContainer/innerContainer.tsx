interface IProps {
  children: React.ReactNode;
}

export function InnerContainer({ children }: IProps) {
  return <div className="p-10">{children}</div>;
}
