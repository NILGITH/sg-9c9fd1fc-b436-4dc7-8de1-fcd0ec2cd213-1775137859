import { useEffect, useRef } from "react";

const partners = [
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "IBM", logo: "https://logo.clearbit.com/ibm.com" },
  { name: "Oracle", logo: "https://logo.clearbit.com/oracle.com" },
  { name: "SAP", logo: "https://logo.clearbit.com/sap.com" },
  { name: "Cisco", logo: "https://logo.clearbit.com/cisco.com" },
  { name: "AWS", logo: "https://logo.clearbit.com/aws.amazon.com" },
  { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com" },
];

export function PartnersSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollInterval = 30;

    const scroll = () => {
      scrollAmount += scrollStep;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
        scrollAmount = 0;
      } else {
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(scroll, scrollInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden py-4">
      <div
        ref={scrollRef}
        className="flex gap-12 overflow-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {/* Duplicate partners for seamless loop */}
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${partner.name}&background=0066CC&color=fff&size=128`;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}