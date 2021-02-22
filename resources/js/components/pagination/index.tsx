import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";
import {Pagination } from "../../interface";

interface Props {
    paginator:Pagination<unknown>
}

const Pagination:React.FC<Props> = ({paginator}) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {paginator.links.map((link) => (
                    <li
                        className={`page-item ${link.active ? "active" : ""} ${
                            !link.url ? "disabled" : ""
                        }`}
                        key={link.label}
                    >
                        <InertiaLink
                            preserveScroll
                            className="page-link"
                            href={link.url || "#"}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </li>
                ))}
            </ul>
            <small>
                showing {paginator.from} to {paginator.to} of {paginator.total}
            </small>
        </nav>
    );
};

export default Pagination;
