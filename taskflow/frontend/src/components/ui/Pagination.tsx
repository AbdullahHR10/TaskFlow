import Button from "@/components/ui/Button";

interface PaginationProps {
  page: number;
  pages: number;
  onChange: (page: number) => void;
  isFetching?: boolean;
}

const Pagination = ({ page, pages, onChange, isFetching }: PaginationProps) => {
  if (pages <= 1) return null;

  const goTo = (p: number) => {
    if (p < 1 || p > pages || p === page) return;
    onChange(p);
  };

  return(
    <div className="flex items-center justify-center gap-2">
      <Button
        text="Prev"
        variant="secondary"
        disabled={page === 1 || isFetching}
        onClick={() => goTo(page - 1)}
      />

      {Array.from({ length: pages}, (_, i) => i + 1).map(p => (
        <Button
          key={p}
          text={String(p)}
          variant={p === page? "primary" : "secondary"}
          disabled={isFetching}
          onClick={() => goTo(p)}
        />
      ))}

      <Button
        text="Next"
        variant="secondary"
        disabled={page === pages || isFetching}
        onClick={() => goTo(page + 1)}
      />
    </div>
  );
}

export default Pagination;
