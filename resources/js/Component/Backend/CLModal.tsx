import { Button, Modal } from "react-bootstrap";
import { FormEvent, memo, useCallback } from "react";
import { useForm } from "@inertiajs/react";
import { CLModalProps } from "../../type/userProps";

function CLModal({
  modalType,
  recordId,
  routeLink,
  modalFlip,
  handleModalState,
}: CLModalProps) {
  const { delete: destroy } = useForm({
    demo: "",
  });

  const handleDeleteRecord = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!recordId) return;

      const deleteParams =
        modalType === "search" ? getSearchParams(recordId) : { id: recordId };

      destroy(route(routeLink, deleteParams), {
        preserveScroll: true,
        onSuccess: () => handleModalState("2"),
      });
    },
    [recordId, modalType, routeLink, handleModalState, destroy]
  );

  const getSearchParams = (id: number) => {
    const url = new URL(window.location.href);
    const currentPage = url.searchParams.get("page") || "1";
    const searchInput = url.searchParams.get("search") || "__BLANK__";

    return {
      id,
      pageNumber: currentPage,
      search: searchInput,
    };
  };

  return (
    <Modal
      id="flipModal"
      show={modalFlip}
      onHide={() => handleModalState("1")}
      className="flip"
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="fs-16">Are you sure you want to delete this item?</h5>
        <p className="text-muted">
          Deleting this data will remove all related data permanently. This
          includes account information, activity history, and any linked
          records. Once deleted, this action cannot be undone. Please confirm
          before proceeding.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => handleModalState("1")}>
          {" "}
          Close{" "}
        </Button>

        <form onSubmit={handleDeleteRecord}>
          <Button type="submit" variant="primary">
            {" "}
            Delete{" "}
          </Button>
        </form>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(CLModal);
