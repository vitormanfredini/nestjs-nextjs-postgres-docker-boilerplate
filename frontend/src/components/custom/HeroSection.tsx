import Link from "next/link";

export type HeroSectionProps = {
  title: string,
  subtitle: string,
  buttonText: string,
  buttonUrl: string
};

export function HeroSection({ props } : { readonly props: HeroSectionProps }) {
  
  const {
    title,
    subtitle,
    buttonText,
    buttonUrl
  } = props;

  return (
    <header className="relative h-[600px] overflow-hidden">
      <img
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
        height={1080}
        src="https://images.pexels.com/photos/4050314/pexels-photo-4050314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
        width={1920}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
        {title}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">
        {subtitle}
        </p>
        <Link
          className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
          href={buttonUrl}
        >
          {buttonText}
        </Link>
      </div>
    </header>
  );

}