import { useState } from "react";
import { Input } from "../ui/input";

export default function ConversationSearch({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="p-2">
      <Input
        type="text"
        placeholder="Search conversations"
        value={query}
        onChange={handleSearch}
        className="w-full"
      />
    </div>
  );
}
