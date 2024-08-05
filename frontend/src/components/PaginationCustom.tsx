import React from "react";
import { PaginationInfo } from "../models/pagination.model";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationCustomProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export const PaginationCustom: React.FC<PaginationCustomProps> = ({
  pagination,
  onPageChange,
}) => {
  const { page, pageCount } = pagination;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return;
    onPageChange(newPage);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= pageCount; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === page}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page - 1);
            }}
          />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
