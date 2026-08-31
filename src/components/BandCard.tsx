import { Band } from "@/types/band";
type BandCardProps = {
  band: Band;
};
export default function BandCard({ band }: BandCardProps) {
  return (
    <>
      <article key={band.id} className="courseCard">
        <h2>{band.bandname}</h2>
        <h2>ชื่อสมาชิก</h2>
        <ul>
          {band.member.map((member, index) => (
            <li key={index}>
              <strong>ชื่อ {member.name} </strong> - <>{member.role}</>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
