import { useState } from "react";

import Button from "@/components/ui/Button";

import type { Note } from "@/features/notes/types/note";

import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface ViewNoteModalProps {
  note: Note;
  onClose: () => void;
  onUpdate: (note: Note) => void;
  onDelete: (note: Note) => void;
}

const ViewNoteModal = ({
  note,
  onClose,
  onUpdate,
  onDelete,
}: ViewNoteModalProps) => {
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] =
    useState(false);

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center
        justify-center bg-black/50 p-4
      "
      onClick={onClose}
    >
      <div
        className="
          flex max-h-[90vh] w-full max-w-2xl
          flex-col rounded-3xl bg-background
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 pb-4">
          <h2 className="text-3xl font-bold leading-tight">
            {note.title}
          </h2>

          <div className="ml-4 flex items-center gap-2">
            <button
              onClick={() => onUpdate(note)}
              className="
                flex h-10 w-10 items-center justify-center rounded-xl 
                text-blue-500 transition hover:cursor-pointer hover:bg-gray-500/10
              "
            >
              <FiEdit2 size={18} />
            </button>

            <div className="relative">
              <button
                onClick={() =>
                  setIsDeleteMenuOpen((prev) => !prev)
                }
                className="
                  flex h-10 w-10 items-center justify-center rounded-xl
                  text-red-500 transition hover:cursor-pointer hover:bg-red-500/10
                "
              >
                <FiTrash2 size={18} />
              </button>

              {isDeleteMenuOpen && (
                <div
                  className="
                    absolute right-0 top-12 z-50
                    flex w-56 flex-col gap-3
                    rounded-2xl border border-divider
                    bg-background p-4 shadow-2xl
                  "
                >
                  <p className="text-sm text-muted-foreground">
                    Delete this note?
                  </p>

                  <div className="flex justify-end gap-2">
                    <Button
                      text="Cancel"
                      variant="secondary"
                      onClick={() =>
                        setIsDeleteMenuOpen(false)
                      }
                    />

                    <Button
                      text="Delete"
                      onClick={() => onDelete(note)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto px-6 pb-6">
          <p
            className="
              whitespace-pre-wrap
              text-[15px] leading-8
              text-muted-foreground
            "
          >
            {note.content}
          </p>
        </div>

        <div className="flex justify-end p-6">
          <Button
            text="Close"
            variant="primary"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewNoteModal;