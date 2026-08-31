import BandCard from "@/components/BandCard"
import {bands} from "@/data/bandsdata"

export default function BandPage(){
    return(
        <>
        <section className="courseGrid">
          {bands.map((band) => (
            <BandCard key={band.id} band={band} />
          ))}
        </section>
      </>
    );
}