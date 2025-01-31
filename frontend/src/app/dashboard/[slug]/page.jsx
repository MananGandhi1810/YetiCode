import axios from "axios";
import Dashi from "./dashi";

export default async function Page({ params }) {
  // Extract and decode the slug from params
  const slug = decodeURIComponent((await params).slug);
  // console.log("Slug:", slug);
  // let data = "";
  // function getRepoFullName(url) {
  //   const regex =
  //     /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?\/?$/;
  //   const match = url.match(regex);
  //   return match ? `${match[1]}/${match[2].replace(/\.git$/, "")}` : null;
  // }

  // // Fetch data from the API
  // let responseData = null;
  // try {
  //   const response = await axios.get(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/webhook/${slug}`
  //   );
  //   const url = response.data.data.webhook.repoUrl; // Extract response data
  //   data = getRepoFullName(url);
  //   console.log(data);
  // } catch (error) {
  //   console.error("Error fetching webhook data:", error);
  // }

  return (
    <div className="mx-auto max-w-7xl p-5 space-y-10 lg:px-8 lg:py-32">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Project Dashboard
      </h1>
      <Dashi slug={slug} />
    </div>
  );
}
