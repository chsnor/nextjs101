import { Band } from "@/types/band";
import Image from "next/image";

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
        {member?.map(({ img: pic, role, name }) => (
          <li key={name} className="memberItem">
            {pic && (
              <Image
                src={pic}
                alt={name}
                width={50}
                height={50}
                className="memberAvatar"
              />
            )}
            <div className="memberInfo">
              <span className="memberName">{name}</span>
              <span className="memberRole">{role}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
