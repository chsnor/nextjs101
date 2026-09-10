import { bands } from "@/data/bandsdata";
import BandExplorer from "@/components/BandExplorer";

export default function BandPage() {
  return (
    <section >
      
      <BandExplorer bands={bands}/>
    </section>
  );
}
