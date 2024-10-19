import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTable } from "@/components/data-table/data-table";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type Transcription = {
  timestamp: string;
  location: string;
  audio_emotions: { name: string; score: number }[];
  face_emotions: { name: string; score: number }[];
  text: string;
  urgency_level: number;
  summary: string;
};

const transcriptionData: Transcription[] = [
  {
    timestamp: "2023-10-29 12:00:00",
    location: "San Francisco, CA",
    audio_emotions: [
      { name: "happiness", score: 0.9 },
      { name: "sadness", score: 0.1 },
    ],
    face_emotions: [
      { name: "happiness", score: 0.88 },
    ],
    text: "I'm so happy sad to see you!",
    urgency_level: 1,
    summary: "This person is happy sad to see you. There's no urgent situation here.",
  },
];

const columns: ColumnDef<Transcription>[] = [
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Geolocation" />
    ),
  },
  {
    accessorKey: "audio_emotions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Audio Emotions" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("audio_emotions").map((emotion) => (
          <Badge key={emotion.name} variant={"secondary"} className="mr-1">
            {emotion.name}: {emotion.score.toFixed(2)}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "face_emotions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Face Emotions" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("face_emotions").map((emotion) => (
          <Badge key={emotion.name} variant={"secondary"} className="mr-1">
            {emotion.name}: {emotion.score.toFixed(2)}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "text",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transcription" />
    ),
  },
  {
    accessorKey: "urgency_level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Urgency Level" />
    ),
  },
  {
    accessorKey: "summary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Summary" />
    ),
  }
  
];

type Emotion = {
  label: string;
  value: string;
};

export default function TranscriptionTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] =
    useState<Transcription[]>(transcriptionData); // Initialized with an empty array
  const [emotions, setEmotions] = useState<Emotion[]>([]); // Initialized with an empty array

  const fetchAudio = async () => {
    try {
      console.log("fetching audio");
      setIsOpen(true);
      const response = await fetch("/api/audio");
      const data: Transcription = await response.json();
      console.log(data);

      // transform the data to match the tableData type
      data.timestamp = data.timestamp || new Date().toLocaleString();
      data.location = data.location || "San Francisco, CA";
      data.audio_emotions = data.audio_emotions || [];
      data.face_emotions = data.face_emotions || [];

      // Add the new transcription to tableData
      setTableData((prevData) => [...prevData, data]);

      // Update emotions with unique emotions from all transcriptions
      const allEmotions = new Set(
        tableData.flatMap((transcription) =>
          transcription.audio_emotions.map((emotion) => emotion.name),
        ),
      );
      const emotionArray = Array.from(allEmotions).map((emotion) => ({
        label: emotion,
        value: emotion,
      }));
      setEmotions(emotionArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "P" || e.key === "p") {
        fetchAudio();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [tableData]);

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Capturing audio...</AlertDialogTitle>
            <AlertDialogDescription>
              We are receiving your audio input, and replying using text-to-speech and GPT-4.
              <br /><br />Then, we&apos;re sending your audio input to Hume for processing and transcription.
              <br /><br />After that we use the processed data to calculate an urgency level and summary of your situation for first responders.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsOpen(false)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DataTable
        columns={columns}
        data={tableData}
        filterString="Filter by emotion"
        filterValues={emotions}
      />
    </>
  );
}
