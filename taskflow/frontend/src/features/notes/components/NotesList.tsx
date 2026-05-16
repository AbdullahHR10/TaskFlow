import NoteItem from "./NoteItem";
import type { Note } from "../types/note";

interface NotesListProps {
  notes: Note[]
  onNoteClick?: (note: Note) => void;
}

const NotesList = ({ notes, onNoteClick }: NotesListProps) => {

  if (!notes.length) {
    return <div className="text-muted">No notes yet 🫠</div>;
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onClick={onNoteClick}
          />
        ))}
      </div>
    </div>
  );
}

export default NotesList;
