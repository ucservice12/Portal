"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH3, TypographyMuted } from "@/components/custom/Typography";
import { Pencil, Trash } from "lucide-react";

export function CommentDialog({
  open,
  onOpenChange,
  comments = [],
  onAddComment,
  commentInput,
  setCommentInput,
  onDeleteComment, // optional: pass handler to delete
  onEditComment, // optional: pass handler to edit
}) {
  const scrollRef = useRef(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments, open]);

  const handleSend = () => {
    if (!commentInput.trim()) return;

    if (editingIndex !== null) {
      onEditComment(editingIndex, commentInput);
      setEditingIndex(null);
    } else {
      onAddComment(commentInput);
    }

    setCommentInput("");
  };

  const handleEditClick = (i) => {
    setEditingIndex(i);
    setCommentInput(comments[i].text);
  };

  const handleDeleteClick = (i) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      onDeleteComment(i);
    }
  };

  const getDateLabel = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);

    const isToday = created.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = created.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return created.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getTimeLabel = (createdAt) => {
    return new Date(createdAt).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full max-h-[90vh] flex flex-col space-y-4">
        <TypographyH3>Comments</TypographyH3>

        {/* Scrollable Message List */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-3 p-2 rounded-md border max-h-[300px] sm:max-h-[350px] scrollbar-hide"
        >
          {comments.length === 0 ? (
            <p className="text-muted-foreground italic text-center">
              No comments yet.
            </p>
          ) : (
            comments.map((comment, i) => {
              return (
                <div
                  key={i}
                  className={`group flex ${
                    comment.isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    title={new Date(comment.createdAt).toLocaleString()}
                    className={`relative p-3 max-w-[85%] sm:max-w-[75%] break-words rounded-2xl shadow-sm ${
                      comment.isMe
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-muted-foreground rounded-bl-none"
                    }`}
                  >
                    {/* Name */}
                    <div
                      className={`text-xs mb-1 ${
                        comment.isMe ? "text-right" : "text-left"
                      }`}
                    >
                      @{comment.user?.name}
                    </div>

                    {/* Message */}
                    <div className="text-xs whitespace-pre-wrap">
                      {comment.text}
                    </div>

                    {/* Time */}
                    <TypographyMuted className="text-[10px] mt-1 text-right text-slate-400 uppercase">
                      {getDateLabel(comment.createdAt)} •{" "}
                      {getTimeLabel(comment.createdAt)}
                    </TypographyMuted>

                    {/* Edit/Delete for Own Message */}
                    {comment.isMe && (
                      <div className="absolute top-1 left-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="w-6 h-6 p-1"
                          onClick={() => handleEditClick(i)}
                        >
                          <Pencil />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="w-6 h-6 p-1"
                          onClick={() => handleDeleteClick(i)}
                        >
                          <Trash className="text-red-600" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input and Send */}
        <div className="space-y-2">
          <Textarea
            placeholder="Type your message..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="resize-none h-24 max-h-[30vh] scrollbar-hide"
          />
          <div className="text-right">
            <Button
              onClick={handleSend}
              disabled={!commentInput.trim().length}
              className="transition disabled:opacity-60"
            >
              {editingIndex !== null ? "Update" : "Send"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
