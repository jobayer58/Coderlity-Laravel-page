import { memo, useCallback, useMemo } from "react";
import { Pagination } from "react-bootstrap";
import { router } from "@inertiajs/react";
import { PageLink } from "../../type/userProps";

function CLPagination({ pages }: { pages: PageLink[] }) {
  if (!pages?.length) return null;

  const handleDynamicRoute = useCallback((routeLink: string | null) => {
    if (routeLink && routeLink !== "#" && routeLink !== "") {
      router.visit(routeLink, { method: "get" });
    }
  }, []);
 
  const paginationItems = useMemo(() => {
    return pages?.map((item, index) => {
      const isDisabled = !item.url || item.url === "#" || item.url === "";
      const displayLabel =
        item.label === "&laquo; Previous"
          ? "← Prev"
          : item.label === "Next &raquo;"
          ? "Next →"
          : item.label;

      return (
        <Pagination.Item
          key={`disabled-${index}`}
          onClick={() => handleDynamicRoute(item.url)}
          className={isDisabled ? "disabled" : ""}
          active={item.active}
          disabled={isDisabled}
        >
          {displayLabel}
        </Pagination.Item>
      );
    });
  }, [pages, handleDynamicRoute]);

  return <Pagination>{paginationItems}</Pagination>;
}

export default memo(CLPagination);
