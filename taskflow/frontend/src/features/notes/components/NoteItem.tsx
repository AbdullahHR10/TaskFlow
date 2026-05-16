import type { Note } from "../types/note";
import { NOTE_BG_COLOR_MAP } from "../utils/noteColors";

interface NoteItemProps {
  note: Note;
  onClick?: (note: Note) => void;
}

const NoteItem = ({ note, onClick }: NoteItemProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick?.(note)}
      className={`
        group flex min-h-52 w-full flex-col rounded-2xl
        border border-divider p-5 text-left
        shadow-sm transition-all duration-200
        hover:-translate-y-1 hover:shadow-lg
        hover:cursor-pointer active:translate-y-0
        ${NOTE_BG_COLOR_MAP[note.background_color]}
      `}
    >

      {note.title && (
        <h3 className="mb-3 line-clamp-2 text-base font-semibold leading-6">
          {note.title}
        </h3>
      )}

      {note.content && (
        <p className="text-muted line-clamp-7 whitespace-pre-wrap wrap-break-words text-sm leading-6 text-muted-foreground">
          {note.content}
        </p>
      )}
    </button>
  );
};

export default NoteItem;