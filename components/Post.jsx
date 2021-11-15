export default function Post({ title, content, handleClick }) {
  return (
    <>
      <div
        onClick={handleClick}
        className="flex flex-col p-4 m-4 bg-gray-200 cursor-pointer rounded"
      >
        <div>
          <h6 className="py-2 font-bold text-red-900 text-2xl">{title}</h6>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
}
