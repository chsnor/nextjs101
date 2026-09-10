import { Band } from "@/types/band";
import Image from "next/image";
import MemberItem from "./MemberItem";
import CounterDemo from "@/components/CounterDemo"
export type BandcardProp = {
  band: Band;
   isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export default function BandCard({ band,
  isFavorite,
  onToggleFavorite, }: BandcardProp) {
  const { bandname, img, member } = band;
  return (
    <article className="courseCard">
      <h2>{bandname}</h2>

      {img && (
        <Image
          src={img}
          alt={bandname}
          width={400}
          height={200}
          className="bandImage"
        />
      )}
      <button
          type="button"
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(band.id)}
        >
          {isFavorite ? "ติดตามแล้ว" : "ติดตาม"}
        </button>
 <CounterDemo/>
      <h3>สมาชิก</h3>
      <ul className="memberList">
        {member.map((m) => (
          <MemberItem key={m.name} member={m} />
        ))}
      </ul>
    </article>
  );
}
