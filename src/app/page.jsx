import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoveRight, Eye } from "lucide-react";
export default function Home() {
  return (
    <>
      <header className="flex w-[1044px] mx-auto justify-between  items-center py-6 px-10 sticky top-0 z-50 bg-white">
        <Image
          src={"/assets/logo-text.svg"}
          alt="DataTalk logo"
          width={120}
          height={120}
        />
        <nav className="flex gap-6 font-medium text-lg">
          <Link href={"#"} className="text-primary1 ">
            Features
          </Link>
          <Link href={"#about"}>About us</Link>
          <Link href={"#offer"}>What we offer</Link>
        </nav>
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "md",
            className:
              " bg-primary1 px-10 py-2 rounded-lg hover:bg-opacity-80 hover:bg-primary1 hover:text-white text-white text-3xl",
          })}
          href={"/login"}
        >
          Login
        </Link>
      </header>
      <main className="  text-color py-10 ">
        <section className="w-[1000px] h-full relative mx-auto">
          <div className="absolute inset-0 bg-[url('/assets/home-page-background.jpg')] bg-no-repeat bg-cover bg-center opacity-50"></div>
          <div className="relative z-10 flex flex-col gap-4 justify-center items-center w-full h-full p-4 mb-40">
            <h1 className="text-4xl font-semibold capitalize text-center w-full max-w-3xl leading-relaxed text-gray-800">
              real-time data insights visualize with AI chat instantly
            </h1>
            <p className="font-base text-gray-600 text-center w-full max-w-2xl text-sm">
              AI-powered analytics for businesses, No-code, fast,
              cost-effective, and scalable for seamless data-driven decisions
            </p>
            <Button className="bg-primary1 px-10 py-4 text-sm  font-medium hover:bg-opacity-80 hover:bg-primary1">
              <Link href={"/login"} className="flex items-center">
                Get Started <MoveRight className="ml-2" size={24} />
              </Link>
            </Button>
          </div>
          <div className="relative mx-auto w-full h-[799px]">
            <Image src={"/assets/data-prep.jpg"} alt="mac image" fill />
          </div>
        </section>
        <section className="w-[1000px] mx-auto my-40">
          <h2 className="text-color text-3xl capitalize font-semibold mb-10 leading-relaxed w-1/2">
            effortless and seamless onboarding{" "}
            <span className="text-primary1">Experience</span>
          </h2>
          <div className="grid grid-cols-2 gap-10 place-items-start">
            <div className="">
              <div className="w-[500px] h-fit bg-[#EFF8FF] flex flex-col items-center justify-between p-4 rounded-lg">
                <div className="flex justify-between items-center w-full">
                  <Image
                    src={"/assets/type-otp.svg"}
                    alt="visualization"
                    width={144}
                    height={144}
                  />
                  <Image
                    src={"/assets/code-otp.svg"}
                    alt="visualization"
                    width={144}
                    height={144}
                  />
                </div>
                <div className="w-full h-full py-10">
                  <h2 className="font-semibold text-xl capitalize">
                    User Authentication & Access
                  </h2>
                  <p className="text-sm mt-2">
                    Log in Effortlessly to unlock your personalized dashboard
                    and essential tools, giving you immediate access to
                    everything you need in a secure enviroment.
                  </p>
                </div>
              </div>
              <div className="w-[500px] h-[200px] bg-[#EFF8FF] flex items-center justify-between p-4 rounded-lg mt-10">
                <Image
                  src={"/assets/data-bot.svg"}
                  alt="visualization"
                  width={144}
                  height={144}
                />
                <div className="w-[300px] h-full py-10">
                  <h2 className="font-semibold text-xl capitalize">
                    Connect Database
                  </h2>
                  <p className="text-slate-500 text-sm mt-2">
                    Effortlessly connect to your database,enabling seamless data
                    integrationi in minutes.
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-[500px] h-[200px] bg-[#EFF8FF] flex items-center justify-between p-4 rounded-lg">
                <Image
                  src={"/assets/dataData.svg"}
                  alt="visualization"
                  width={144}
                  height={144}
                />
                <div className="w-[300px] h-full py-10">
                  <h2 className="font-semibold text-xl capitalize">
                    get data and visualize
                  </h2>
                  <p className="text-slate-500 text-sm mt-2">
                    receive instant insights throught beautiful, dynamic
                    visualizations that bring your data to life
                  </p>
                </div>
              </div>
              <div className="w-[500px] h-[200px]  flex flex-row-reverse items-center justify-between  rounded-lg mt-10 gap-4">
                <div className="bg-primary1 h-full w-2/5 flex justify-center items-center rounded-lg ">
                  <Image
                    src={"/assets/questionGroup.svg"}
                    alt="ask question"
                    width={100}
                    height={100}
                    className="animate-bounce duration-1000"
                  />
                </div>
                <div className="w-3/5 h-full py-10 bg-[#EFF8FF] rounded-lg p-4">
                  <h2 className="font-semibold text-xl capitalize">
                    ask question
                  </h2>
                  <p className="text-slate-500 text-sm mt-2">
                    Simply type your question in plian language, and our system
                    will retrive the data you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="offer" className="w-full bg-[#EFF8FF] py-20">
          <div className="w-[1000px] mx-auto">
            <h1 className="text-3xl text-color font-semibold text-center mb-10">
              What <span className="text-primary1">we</span> Offer
            </h1>
            <div className="space-y-5">
              <div className="flex justify-between items-center w-full">
                <Image
                  src={"/assets/friendlydata.svg"}
                  alt="Friendly Data View"
                  width={300}
                  height={300}
                />
                <div className="w-1/2">
                  <h2 className="text-2xl text-color font-semibold">
                    Friendly Data view
                  </h2>
                  <p className="mt-10 text-color text-sm">
                    Friendly data view Design your business card in 2 minutes -
                    it&apos;s easy, elegant and free. DIBIZ is always in your
                    pocket, never tears and never runs out. Your EBEX can be
                    easily updated with our user-friendly dashboard, so you
                    won&apos;t need to re-print a business card again.
                  </p>
                </div>
              </div>
              <div className="flex flex-row-reverse justify-between items-center w-full">
                <Image
                  src={"/assets/dataTable.svg"}
                  alt="Friendly Data View"
                  width={300}
                  height={300}
                />
                <div className="w-1/2">
                  <h2 className="text-2xl text-color font-semibold">
                    Dynamic Data Table
                  </h2>
                  <p className="mt-10 text-color text-sm">
                    Friendly data view Design your business card in 2 minutes -
                    it&apos;s easy, elegant and free. DIBIZ is always in your
                    pocket, never tears and never runs out. Your EBEX can be
                    easily updated with our user-friendly dashboard, so you
                    won&apos;t need to re-print a business card again.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <Image
                  src={"/assets/data-visualization.svg"}
                  alt="Friendly Data View"
                  width={300}
                  height={300}
                />
                <div className="w-1/2">
                  <h2 className="text-2xl text-color font-semibold">
                    Data Visualization
                  </h2>
                  <p className="mt-10 text-color text-sm">
                    Friendly data view Design your business card in 2 minutes -
                    it&apos;s easy, elegant and free. DIBIZ is always in your
                    pocket, never tears and never runs out. Your EBEX can be
                    easily updated with our user-friendly dashboard, so you
                    won&apos;t need to re-print a business card again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="w-[1000px] mx-auto my-10 flex justify-between items-center"
        >
          <div className="w-80 h-80 relative">
            <div className="w-80 h-72 pl-7 pr-6 pt-11 pb-24 left-0 top-[28px] absolute bg-white rounded-lg shadow border border-gray-200 border-b-8 border-b-blue-500 flex-col justify-start items-center gap-3.5 inline-flex">
              <div className="self-stretch justify-start items-center gap-3.5 inline-flex mx-auto">
                <div className="text-xl font-semibold">
                  <span className="text-[#2563EB] ">Our</span>{" "}
                  <span className="text-[#1f2937]  ">Strategy</span>
                </div>
              </div>
              <div className="self-stretch h-24 flex-col justify-center items-start gap-5 inline-flex">
                <div className="self-stretch h-24 text-center text-cyan-950 text-xs font-normal leading-7">
                  Develop an AI-powered platform for natural language queries,
                  dynamic visualizations, secure data, and cross-platform
                  access, optimized for accuracy and scalability.
                </div>
              </div>
            </div>
            <div className="w-14 h-14 left-1/2 top-0 absolute transform -translate-x-1/2">
              <div className="w-14 h-14 left-0 top-0 absolute bg-blue-500 rounded-lg shadow border border-blue-500 flex items-center justify-center">
                <Image
                  src={"/assets/target-04.svg"}
                  alt="Targete"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
          <div className="w-80 h-80 relative">
            <div className="w-80 h-72 pl-7 pr-6 pt-11 pb-24 left-0 top-[28px] absolute bg-white rounded-lg shadow border border-gray-200 border-b-8 border-b-blue-500 flex-col justify-start items-center gap-3.5 inline-flex">
              <div className="self-stretch justify-start items-center gap-3.5 inline-flex mx-auto">
                <div className="text-xl font-semibold">
                  <span className="text-[#2563EB] ">Our</span>{" "}
                  <span className="text-[#1f2937]  ">Goal</span>
                </div>
              </div>
              <div className="self-stretch h-24 flex-col justify-center items-start gap-5 inline-flex">
                <div className="self-stretch h-24 text-center text-cyan-950 text-xs font-normal leading-7">
                  Create an AI-powered platform for natural language database
                  queries, dynamic visualizations, and secure, cross-platform
                  data interaction, enabling seamless decision-making.
                </div>
              </div>
            </div>
            <div className="w-14 h-14 left-1/2 top-0 absolute transform -translate-x-1/2">
              <div className="w-14 h-14 left-0 top-0 absolute bg-blue-500 rounded-lg shadow border border-blue-500 flex items-center justify-center">
                <Image
                  src={"/assets/presention-chart.svg"}
                  alt="presentation chart"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
          <div className="w-80 h-80 relative">
            <div className="w-80 h-72 pl-7 pr-6 pt-11 pb-24 left-0 top-[28px] absolute bg-white rounded-lg shadow border border-gray-200 border-b-8 border-b-blue-500 flex-col justify-start items-center gap-3.5 inline-flex">
              <div className="self-stretch justify-start items-center gap-3.5 inline-flex mx-auto">
                <div className="text-xl font-semibold">
                  <span className="text-[#2563EB] ">Our</span>{" "}
                  <span className="text-[#1f2937]  ">Vision</span>
                </div>
              </div>
              <div className="self-stretch h-24 flex-col justify-center items-start gap-5 inline-flex">
                <div className="self-stretch  h-24 text-center text-cyan-950 text-xs font-normal leading-7">
                  Our vision is to revolutionize database interaction with
                  AI-powered chat and NLP, creating an intuitive platform where
                  users can easily query and visualize complex data, clearer
                  decision-making.
                </div>
              </div>
            </div>
            <div className="w-14 h-14 left-1/2 top-0 absolute transform -translate-x-1/2">
              <div className="w-14 h-14 left-0 top-0 absolute bg-blue-500 rounded-lg shadow border border-blue-500 flex items-center justify-center">
                <Eye width={32} color="white" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full bg-[#EFF8FF] px-10 py-6">
        <div className="flex justify-between items-center">
          <Image
            src={"/assets/logo-text.svg"}
            alt="Data Talk Logo"
            width={120}
            height={120}
          />
          <h2 className="text-xl text-primary1 font-medium">
            Instant Visuals from Your Questions
          </h2>
        </div>
        <div className="flex justify-between items-start mt-10">
          <div className="flex gap-10">
            <ul className="text-color space-y-4 text-sm">
              <li className="font-semibold text-base">Page</li>
              <li>Feature</li>
              <li>About us</li>
              <li>What we offers</li>
            </ul>
            <ul className="text-color space-y-4 text-sm">
              <li className="font-semibold text-base">Resource</li>
              <li>YouTube</li>
              <li>Support</li>
              <li>Korea Software HRD</li>
            </ul>
            <ul className="text-color space-y-4 text-sm">
              <li className="font-semibold text-base">Legal</li>
              <li>Privacy policy</li>
              <li>Term of use</li>
              <li>cookie policy</li>
            </ul>
          </div>
          <div className="flex gap-4">
            <Link href="https://www.tiktok.com/@kshrd.center?_t=8qnvhHXRM9Z&_r=1">
              <Image
                src={"/assets/tiktok.svg"}
                alt="TikTok"
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://www.facebook.com/ksignhrd?mibextid=ZbWKwL">
              <Image
                src={"/assets/facebook.svg"}
                alt="TikTok"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
        <div className="w-full text-center text-xs mt-10">
          <h2>
            Website by{" "}
            <span className="text-primary1 font-semibold">KSHRD students</span>{" "}
            Privacy Policy
          </h2>
          <p> &copy; 2024 DataTalk</p>
        </div>
      </footer>
    </>
  );
}
