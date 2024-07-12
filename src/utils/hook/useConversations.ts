import { useState, useEffect } from "react";

const useConversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await fetch("/data/dummyConvo.json");
      const data = await response.json();
      setConversations(data);
    };

    fetchConversations();
  }, []);

  return conversations;
};

export default useConversations;
