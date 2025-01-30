import Dashi from "./dashi";

export default async function Page({ params }) {
  const slug = (await params).slug;

  return (
    <div className="mx-auto max-w-7xl p-5 space-y-10 lg:px-8 lg:py-32">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Project Dashboard
      </h1>
      <Dashi slug={slug} />
    </div>
  );
}
