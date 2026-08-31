import { Band } from "@/types/band";
import Image from "next/image";
type BandCardProps = {
  band: Band;
};
export default function BandCard({ band }: BandCardProps) {
  return (
    <article className="courseCard">
      <h2>{band.bandname}</h2>
      
      {band.img && (
        <Image
          src={band.img}
          alt={band.bandname}
          width={400}
          height={200}
          className="bandImage"
        />
      )}

      <h3>สมาชิก</h3>
      <ul className="memberList">
        {band.member.map((member, index) => (
          <li key={index} className="memberItem">
            {member.img && (
              <Image
                src={member.img}
                alt={member.name}
                width={50}
                height={50}
                className="memberAvatar"
              />
            )}
            <div className="memberInfo">
              <span className="memberName">{member.name}</span>
              <span className="memberRole">{member.role}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

