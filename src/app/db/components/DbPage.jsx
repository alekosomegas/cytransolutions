"use client";

import React from "react";
import Table from "./Table"

export default function DbPAge({ page, titles, filters, setFilters }) {
    const [dbData, setDbData] = React.useState([]);
    const [numOfEntries, setNumOfEntries] = React.useState(0);
    const [pageNo, setPageNo] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    const [pages, setPages] = React.useState([])
    const [sortBy, setSortBy] = React.useState({col:"_id", rev: false})

    React.useEffect(() => {
        fetchData();
    }, [sortBy, pageNo, limit]);


    async function fetchData() {
        const response = await fetch(`/api/${page}?page=${pageNo}&limit=${limit}&sort=${sortBy.col}&rev=${sortBy.rev}`,{
            method: "GET",
    })
    const data = await response.json();

    setDbData(data.body.data);
    setNumOfEntries(data.body.total);
    findAndSetPages(data.body.total)
    }

    function findAndSetPages(total) {
        const arr = Array(Math.ceil(total/limit))
        for (let index = 0; index < arr.length; index++) {
          arr[index] = index +1
        }
        setPages(arr)
    }

    return (
        <Table titles={titles} data={dbData} type={page} setSortBy={setSortBy} sortBy={sortBy} pageNo={pageNo} setPageNo={setPageNo} limit={limit} pages={pages} numOfEntries={numOfEntries} setLimit={setLimit} filters={filters} setFilters={setFilters} />
        )
}