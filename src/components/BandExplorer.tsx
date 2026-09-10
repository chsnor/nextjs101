"use client";
import { Band } from "@/types/band";
import { useState, type ChangeEvent } from "react";
import BandCard from "@/components/BandCard";
import Fuse from "fuse.js";
type BandExplorerProps = {
  bands: Band[];
};
const fuseOptions = {
  keys: ["bandname", "member.name"],
  threshold: 0.3, 
};
export default function BandExplorer({ bands }: BandExplorerProps) {
  const [keyword, setKeyword] = useState("");
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
    }
    const fuse = new Fuse(bands, fuseOptions);
    const visibleBands = !keyword.trim() 
    ? bands
    : fuse.search(keyword.trim()).map((result) => result.item);

    
const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

function handleToggleFavorite(id: number) {
  setFavoriteIds((prevIds) =>
    prevIds.includes(id)
      ? prevIds.filter((favoriteId) => favoriteId !== id)
      : [...prevIds, id],
  );
}
  return (
    <>
      <input
        type="search"
        aria-label="ค้นหาวง"
        value={keyword}
        onChange={handleKeywordChange}
        placeholder="ค้นหาชื่อวงดนตรีหรือสมาชิกวง"
      />
      <p>ติดตามแล้ว {favoriteIds.length} วง</p>
      {visibleBands.length === 0 ? (
        <p>ไม่พบวงดนตรีที่ตรงกับเงื่อนไข</p>
      ) : (
        <section>
          {visibleBands.map((band) => (
            <BandCard key={band.id} band={band}  isFavorite={favoriteIds.includes(band.id)}
              onToggleFavorite={handleToggleFavorite} />
          ))}
        </section>
      )}
    </>
  );
}
