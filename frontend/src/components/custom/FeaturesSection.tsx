export type IconOption = 'clock' | 'check' | 'cloud';

export interface FeatureProps {
  heading: string;
  subHeading: string;
  icon: IconOption;
}

export interface FeatureSectionProps {
  title: string;
  description: string;
  features: FeatureProps[];
}

function getIcon(name: IconOption) {
  switch (name) {
    case "clock":
      return <ClockIcon className="w-12 h-12 mb-4 text-gray-900" />;
    case "check":
      return <CheckIcon className="w-12 h-12 mb-4 text-gray-900" />;
    case "cloud":
      return <CloudIcon className="w-12 h-12 mb-4 text-gray-900" />;
    default:
      return null;
  }
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

export function FeatureSection({ data }: { readonly data: FeatureSectionProps; }) {

  const { features, title, description } = data;

  return (
    <div className="">
      <div className="container mt-9 mb-4">
        <h2 className="text-5xl text-center">{title}</h2>
        <p className="text-1xl text-center mt-2 text-gray-600">{description}</p>
      </div>
      <div className="flex-1">
        <section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
              key={index}
              className="flex flex-col items-center text-center"
              >
                {getIcon(feature.icon)}
                <h2 className="mb-4 text-2xl font-bold">{feature.heading}</h2>
                <p className="text-gray-600">
                  {feature.subHeading}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
