import Image from "next/image";
import { useMobile } from "@/context/MobileContext";
const polygonClass =
  "md:w-[150px] w-[100px] md:h-[150px] h-[100px] md:m-[1.5px] m-[1px] bg-gray-800 flex justify-center items-center hover:opacity-80 transition-all duration-300";
const polygonContainerClass =
  "flex flex-inline md:mt-[-37.5px] mt-[-25px] md:ml-[-75px] ml-[-50px] even:md:ml-[1.5px] even:ml-[1px] cursor-pointer";

interface PolygonProps {
  imageUrl?: string;
  url?: string;
}



export default function HexaSkills() {

  return (
    <div className="  h-fit w-fit mt-10 ml-[40px]">

      <div className={polygonContainerClass}>

        <Polygon imageUrl="/images/skills/html.svg" />
        <Polygon imageUrl="/images/skills/css.svg" />
        <Polygon imageUrl="/images/skills/javascript.svg" />
        <Polygon imageUrl="/images/skills/mongodb.svg" />
      </div>

      <div className={polygonContainerClass}>
        <Polygon imageUrl="/images/skills/react.svg" />
        <Polygon imageUrl="/images/skills/nodejsStackedLight.svg" />
        <Polygon imageUrl="/images/skills/next.svg" />

      </div>

      <div className={polygonContainerClass}>
        <Polygon imageUrl="/images/skills/tailwindcss.svg" />
        <Polygon
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg"
          url="https://graphql.org/"
        />
        <Polygon
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
          url="https://www.postgresql.org/"
        />
        <Polygon imageUrl="/images/skills/bootstrap.svg" />
      </div>

      <div className={polygonContainerClass}>


        <Polygon imageUrl="/images/skills/github.svg" />
        <Polygon imageUrl="/images/skills/typescriptLogoDisp.svg" />
      </div>

      <div className={polygonContainerClass}>
      </div>
    </div>
  );
}

function Polygon({ imageUrl, url }: PolygonProps) {
  const { isMobile } = useMobile();
  return (
    <a
      className={polygonClass}


      style={{
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
      href={url}
      target="_blank"
    >
      {imageUrl && (
        <Image src={imageUrl} alt={imageUrl} width={isMobile ? 30 : 50} height={isMobile ? 30 : 50} />
      )}


    </a>
  );
}
