import { useCallback, useRef, useState } from "react";

type WithId = {
  id: string;
};

type FetchPageFn<T> = (page: number) => Promise<{
  items: T[];
  pages: number;
  currentPage: number;
}>;

export function usePagination<T extends WithId>(
  fetchPage: FetchPageFn<T>
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const requestIdRef = useRef(0);

  const fetchPageData = useCallback(
    async (page: number) => {
      const requestId = ++requestIdRef.current;
      setIsFetching(true);

      try {
        const res = await fetchPage(page);
        if (requestId !== requestIdRef.current) return;

        setItems(res.items);
        setPage(res.currentPage);
        setPages(res.pages);
      } finally {
        setIsFetching(false);
        setIsInitialLoading(false);
      }
    },
    [fetchPage]
  );

  const appendItem = (item: T) => {
    setItems(prev => [item, ...prev]);
  };

  const updateItem = (id: string, updated: T) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? updated : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const fetchNextPage = useCallback(() => {
    if (isFetching || page >= pages) return;
    fetchPageData(page + 1);
  }, [fetchPageData, isFetching, page, pages]);

  return {
    items,
    page,
    pages,
    isFetching,
    isInitialLoading,
    fetchFirstPage: () => fetchPageData(1),
    fetchPage: fetchPageData,
    fetchNextPage,
    appendItem,
    updateItem,
    deleteItem,
  };
}
