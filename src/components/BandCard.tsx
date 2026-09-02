import { Band } from "@/types/band";
import Image from "next/image";
import MemberItem from "./MemberItem";

export type BandcardProp = {
  band: Band;
};

export default function BandCard({ band }: BandcardProp) {
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

      <h3>สมาชิก</h3>
      <ul className="memberList">
        {member.map((m) => (
          <MemberItem key={m.name} member={m} />
        ))}
      </ul>
    </article>
  );
}
