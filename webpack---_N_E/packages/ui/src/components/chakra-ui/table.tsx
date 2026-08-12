import {
    Table as ChakraTable,
    Thead as ChakraThead,
    Tbody as ChakraTbody,
    Tfoot as ChakraTFoot,
    Tr as ChakraTr,
    Th as ChakraTh,
    Td as ChakraTd,
    TableCaption as ChakraTableCaption,
    TableContainer as ChakraTableContainer,
} from "@chakra-ui/react";
import type {
    TableProps as ChakraTableProps,
    TableHeadProps as ChakraTableHeadProps,
    TableBodyProps as ChakraTableBodyProps,
    TableFooterProps as ChakraTableFooterProps,
    TableRowProps as ChakraTableRowProps,
    TableColumnHeaderProps as ChakraTableColumnHeaderProps,
    TableCellProps as ChakraTableCellProps,
    TableCaptionProps as ChakraTableCaptionProps,
    TableContainerProps as ChakraTableContainerProps,
} from "@chakra-ui/react";

type TableProps = ChakraTableProps;
type TableHeadProps = ChakraTableHeadProps;
type TableBodyProps = ChakraTableBodyProps;
type TableFooterProps = ChakraTableFooterProps;
type TableRowProps = ChakraTableRowProps;
type TableColumnHeaderProps = ChakraTableColumnHeaderProps;
type TableCellProps = ChakraTableCellProps;
type TableCaptionProps = ChakraTableCaptionProps;
type TableContainerProps = ChakraTableContainerProps;

const Table = ChakraTable;
const Thead = ChakraThead;
const Tbody = ChakraTbody;
const Tfoot = ChakraTFoot;
const Tr = ChakraTr;
const Th = ChakraTh;
const Td = ChakraTd;
const TableCaption = ChakraTableCaption;
const TableContainer = ChakraTableContainer;

export { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer };
export type {
    TableProps,
    TableHeadProps,
    TableBodyProps,
    TableFooterProps,
    TableRowProps,
    TableColumnHeaderProps,
    TableCellProps,
    TableCaptionProps,
    TableContainerProps,
};
