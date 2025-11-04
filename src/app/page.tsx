// import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link, MessageSquareIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="conatainer mx-auto max-w-3xl px-4 py-8 space-y-8">
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageSquareIcon />
          </EmptyMedia>
          <EmptyTitle>No Chat Rooms</EmptyTitle>
          <EmptyDescription>
            Create a new chat room to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button >
            <Link href="/rooms/new">New Chat Room</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
