import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsSearchProps {
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  setFilterOption: React.Dispatch<React.SetStateAction<string>>;
  rangeOption: string;
  setRangeOption: React.Dispatch<React.SetStateAction<string>>;
}

export const ProductsSearch = ({
  setSearchFilter,
  setFilterOption,
  rangeOption,
  setRangeOption,
}: ProductsSearchProps) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  return (
    <div className="my-5 flex items-center justify-center gap-1.5 flex-wrap">
      <Input
        className="w-fit"
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
      <div className="flex items-center gap-0.5">
        <div className="flex items-center gap-1.5 mx-5 relative">
          <span className="text-xs">0</span>
          <Input
            type="range"
            className="border-none w-fit shadow-none slider"
            min="0"
            max="1749"
            defaultValue={+rangeOption}
            onChange={(e) => setRangeOption(e.target.value)}
          />
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-5 text-xs">
            {rangeOption}
          </span>
          <span className="text-xs">1749</span>
        </div>

        <span className="text-slate-700 text-sm">Sort By:</span>
        <Select onValueChange={(value) => setFilterOption(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Options</SelectLabel>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
