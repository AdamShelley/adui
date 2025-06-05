interface Props {
  snippet: {
    code: string;
    language: string;
    title: string;
  };
}

export const CodeCopier = ({ snippet }: Props) => {
  return (
    <div className="font-semibold mt-5">
      <h4>{snippet.title}</h4>
      <div className="border border-zinc-500 rounded-md p-5 m-5 bg-zinc-800 font-normal text-sm relative">
        <div className="absolute top-0 right-0 p-2">Icons</div>
        {snippet.code}
      </div>
    </div>
  );
};
