import { IoSearchOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

function SearchBar() {
  return (
    <div className="rounded-input flex w-full items-center bg-input px-2 py-2">
      <IoSearchOutline className="text-secondary-article mx-2 h-8 w-8" />
      <input
        type="text"
        placeholder="Search 198 dog breeds"
        className="text-secondary-article placeholder-secondary-article w-full bg-input text-sm outline-0"
      />
      <Button className="rounded-md">Search</Button>
    </div>
  );
}

export default SearchBar;
