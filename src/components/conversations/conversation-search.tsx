import { useState } from "react";
import { Input } from "../ui/input";

export default function ConversationSearch() {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  return (
    <div className="p-2">
      <Input
        type="text"
        placeholder="Search conversations"
        value={query}
        onChange={handleSearch}
        className="w-full rounded-xl"
      />
    </div>
  );
}
