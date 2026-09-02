import { Member } from "@/types/band";
import Image from "next/image";
export type MemberItemProps = {
  member: Member;
};
export default function MemberItem({ member }: MemberItemProps) {
  const { name, role, img } = member;
  return (
    <li key={name} className="memberItem">
      {img && (
        <Image
          src={img}
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
  );
}
