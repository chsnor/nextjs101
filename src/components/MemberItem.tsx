import { Member } from "@/types/band";
import Image from "next/image";
export type MemberItemProps = {
  member: Member;
};
export default function MemberItem({ member }: MemberItemProps) {
  const { name, role, img } = member;
  return (
    <li className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 transition duration-150">
      {img ? (
        <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-700">
          <Image
            src={img}
            alt={name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-11 h-11 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-xs font-semibold shrink-0">
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold text-slate-200 truncate">{name}</span>
        <span className="text-xs text-slate-400 truncate">{role}</span>
      </div>
    </li>
  );
}
