type SpotlightProps = {
  children: React.ReactNode;
};

const SpotlightProvider = (props: SpotlightProps) => {
  return <div>{props.children}</div>;
};

export default SpotlightProvider;
