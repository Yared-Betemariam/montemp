import Image from "next/image";
import Link from "next/link";

const Logo = ({
  w,
  lo,
  l,
  s,
}: {
  w?: boolean;
  l?: boolean;
  lo?: boolean;
  s?: boolean;
}) => {
  return (
    <Link href={"/"}>
      <Image
        src={lo ? "/logo.png" : w ? "/full_w.png" : "/full.png"}
        alt="logo"
        width={3874}
        height={741}
        className={`${
          l
            ? lo
              ? "w-20"
              : " w-52 md:w-64"
            : s
            ? lo
              ? " w-10"
              : " w-44"
            : lo
            ? "w-16"
            : "w-56"
        }`}
      />
    </Link>
  );
};
export default Logo;
