import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Audio() {
  const [audio, setAudio] = useState(null);

  const fetchAudio = async () => {
    try {
      console.log("fetching audio");
      const response = await fetch("/api/audio");
      const data = await response.json();
      console.log(data);
      setAudio(data);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={fetchAudio}>Audio Test</Button>;
}
