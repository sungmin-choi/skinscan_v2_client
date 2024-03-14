import Image from "next/image";

export default function Header() {
  return (
    <div className="w-[100%]">
      <div className="w-[180px] relative h-[50px]">
        <Image
          src={"/logo.png"}
          alt="SkinScan_logo"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
