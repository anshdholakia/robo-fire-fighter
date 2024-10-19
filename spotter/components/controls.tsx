import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

export default function Controls() {
  const [status, setStatus] = useState("idle");
  const [controlsDisabled, setControlsDisabled] = useState(false);

  const handleInput = async (key: any) => {
    if (key !== "f") {
      // "f" corresponds to Stand
      setControlsDisabled(true);
      setTimeout(() => {
        setControlsDisabled(false);
      }, 1200); // 1.2 second delay
    }
    const response = await fetch(`/api/robot/${key}`);
    const data = await response.json();
    setStatus(data.status);
  };

  const handleButtonClick = (key: string) => {
    handleInput(key);
  };
  const handleKeyDown = (event: any) => {
    if (controlsDisabled) {
      return;
    }
    switch (event.key) {
      case "ArrowUp":
      case "w":
        handleInput("w");
        break;
      case "ArrowLeft":
      case "a":
        handleInput("a");
        break;
      case "ArrowDown":
      case "s":
        handleInput("s");
        break;
      case "ArrowRight":
      case "d":
        handleInput("d");
        break;
      case "q":
        handleInput("q");
        break;
      case "e":
        handleInput("e");
        break;
      case "r":
        handleInput("r");
        break;
      case "f":
        handleInput("f");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex">
          <Button
            variant="outline"
            size="lg"
            className="m-1"
            disabled={controlsDisabled}
            onClick={() => handleButtonClick("w")}
          >
            <ChevronUpIcon className="h-8 w-8" />
          </Button>
        </div>
        <div className="flex">
          <Button
            variant="outline"
            size="lg"
            className="m-1"
            disabled={controlsDisabled}
            onClick={() => handleButtonClick("a")}
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="m-1"
            disabled={controlsDisabled}
            onClick={() => handleButtonClick("s")}
          >
            <ChevronDownIcon className="h-8 w-8" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="m-1"
            disabled={controlsDisabled}
            onClick={() => handleButtonClick("d")}
          >
            <ChevronRightIcon className="h-8 w-8" />
          </Button>
        </div>
        <div className="flex mt-3">
          <Button
            variant="outline"
            className="mx-1"
            disabled={controlsDisabled}
            onClick={() => handleButtonClick("q")}
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Turn Left (Q)
          </Button>
          <Button
            variant="outline"
            className="mx-1"
            disabled={controlsDisabled}
            onClick={() => handleButtonClick("e")}
          >
            <ChevronRightIcon className="h-4 w-4 mr-2" />
            Turn Right (E)
          </Button>
        </div>
        <div className="flex mt-3 ml-3">
          <Button
            variant="outline"
            className="mx-1"
            disabled={controlsDisabled}
            onClick={() => handleButtonClick("r")}
          >
            <ChevronDownIcon className="h-4 w-4 mr-2" />
            Sit (R)
          </Button>
          <Button
            variant="outline"
            className="mx-1"
            onClick={() => handleButtonClick("f")}
          >
            <ChevronUpIcon className="h-4 w-4 mr-2" />
            Stand (F)
          </Button>
        </div>
      </div>
      <div className=" flex items-center space-x-4 rounded-md border p-4 mt-12">
        <ActivityLogIcon />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Robot Status</p>
        </div>
        <Badge className="justify-right">
          {controlsDisabled ? "firing motors..." : status}
        </Badge>
      </div>
    </>
  );
}
