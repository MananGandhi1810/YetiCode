import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";

export default function Home() {
    return (
        <div className="mx-auto max-w-7xl p-5 sm:grid justify-center items-center sm:pb-32 gap-10 space-y-10 md:space-y-0 lg:px-8 lg:pt-32 lg:pb-52 h-full relative">
            <h1 className=" scroll-m-20 text-5xl font-extrabold md:leading-relaxed lg:text-7xl text-center bg-gradient-to-br from-white/90 from-30% bg-clip-text ">
                Let&apos;s Cut Dev Time & Bugs in Half
            </h1>
            <p className="scroll-m-20 text-2xl  pb-2  text-center max-w-[40.75rem] mt-2 lg:mt-6  tracking-tight first:mt-0  mx-auto  text-neutral-900">
                Revolutionizing software development with AI-driven micro-tools
                to help you code faster, smarter, and more efficiently.
            </p>{" "}
            <a
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user%20repo`}
                className="mx-auto"
            >
                <Button className="group inline-flex items-center justify-center h-16 px-8 py-5 rounded-full cursor-pointer gap-x-5 !text-button font-heading font-bold bg-yellow-500 hover:bg-gradient-to-r from-yellow-500 to-pink-500 focus:bg-pink-600 focus:outline-pink-600 focus:outline-offset-4  disabled:bg-neutral-100 disabled:text-neutral-400 disabled:pointer-events-none w-full md:w-auto max-w-sm mx-auto">
                    <Github /> Login with Email
                </Button>{" "}
            </a>
            <div className="grid md:grid-cols-2 gap-8 mx-auto relative">
                {/* <div className="absolute hidden top-20 -left-44 -z-10 lg:block">
          <img
            src="https://www.coderabbit.ai/_next/image?url=%2Fimages%2Fshapes%2Fhalfmoon-opposite2.png&w=256&q=75"
            className="h-1/2"
          ></img>
        </div> */}

                <Card className="text-center border-yellow-400/30">
                    <CardHeader>
                        <CardTitle className="font-black">
                            Instant Code Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="pb-2">
                            Get AI-generated README files, best practices, and
                            real-time code reviews.
                        </p>
                    </CardContent>
                </Card>
                <Card className="text-center w-full border-pink-400/30">
                    <CardHeader>
                        <CardTitle className="font-black">
                            Enhanced Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="pb-2">
                            Identify vulnerabilities before they become risks.
                        </p>
                    </CardContent>
                </Card>
                <Card className="text-center w-full border-primary/30">
                    <CardHeader>
                        <CardTitle className="font-black">
                            Smarter Testing
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="pb-2">
                            AI-poweyellow test case generation and execution.
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center w-full border-green/30">
                    <CardHeader>
                        <CardTitle className="font-black">
                            Automated Updates
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="pb-2">
                            Get real-time insights on every push.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

