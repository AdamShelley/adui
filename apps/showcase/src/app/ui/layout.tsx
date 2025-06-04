interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="p-5">{children}</div>;
};

export default Layout;
