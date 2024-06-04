import Link from "next/link";

const BackButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      className="text-sm opacity-65 hover:opacity-90 transition-all text-center hover:brightness-120 drop-shadow-sm w-full"
      href={href}
    >
      {label}
    </Link>
  );
};
export default BackButton;
