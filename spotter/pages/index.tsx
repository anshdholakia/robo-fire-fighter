import Image from "next/image";
import { DataTable } from "@/components/data-table/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WebCam from "@/components/webcam";
import { ScrollArea } from "@/components/ui/scroll-area";
import TranscriptionTable, {
  Transcription,
} from "@/components/transcription-table";
import Controls from "@/components/controls";
import Button from "@/components/recording";
import Input from "@/components/sendText";

export default function Home() {
  return (
    <div>
      <div className="h-screen w-screen grid grid-cols-10 gap-2 p-3">
        <Card className="col-span-7 ">
          <CardHeader>
            <CardTitle>Live Feed</CardTitle>
            <CardDescription>front-facing camera from Spot</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <WebCam />
          </CardContent>
        </Card>
        <Card className="col-span-3 ">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>
              move Spot in real-time with your keyboard and/or these buttons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Controls />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Audio Recording</CardTitle>
            <CardDescription>
              Send audio to Spot!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-2">
            <Button />
            </div>
            <div className="flex items-center justify-center p-2">
              <Input />
            </div>
            
          </CardContent>
        </Card>
      </div>
      {/* <Card className="mx-2 mt-.5">
        <CardHeader>
          <CardTitle>Live Feed</CardTitle>
          <CardDescription>
            real-time transcription from rescues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72 w-full rounded-">
            <TranscriptionTable />
          </ScrollArea>
        </CardContent>
      </Card> */}
    </div>
  );
}
