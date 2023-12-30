import { Card, DropdownButton, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import "../css/AddMovie.css";
import { getActorsAction } from "../action/actorsAction";

const ActorsCombo = ({ handleMovieSelect }) => {
    const actors = useSelector((state) => state.actors);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!actors[0]) {
            dispatch(getActorsAction());
        }
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1);
    const [npage, setNpage] = useState(1);
    const [numbers, setNumbers] = useState([]);
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    useEffect(() => {
        const mov2 = actors
            .filter((item) => {
                return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search.toLowerCase());
            });
        setFilteredRecords(mov2);
        const recs = mov2.slice(firstIndex, lastIndex);
        setRecords(recs);
        const np = Math.ceil(mov2.length / recordsPerPage);
        setNpage(np);
        const nms = [...Array(np + 1).keys()].slice(1);
        setNumbers(nms);
    });

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function changeCPage(id) {
        setCurrentPage(id);
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <DropdownButton
            alignRight
            title="Oyuncular"
            id="dropdown-menu-align-top"
            onSelect={handleMovieSelect}
            style={{width:"110px"}}
        >
            <div className="float-child">
                <div className="box" >
                    <form name="search">
                        <input
                            type="text"
                            className="input1"
                            name="txt"
                            placeholder="Search"
                            onmouseout="this.value = ''; this.blur();"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    <i className="fas fa-search"></i>
                </div>
            </div>
            {records.map((d, i) => (
                <>
                    <Dropdown.Item eventKey={d._id} value={d._id}>
                        <motion.div
                            variants={imageanimations}
                            initial="hidden"
                            animate="show"
                        >

                            <Card>
                                <Card.Header style={{ textAlign: "center" }}>{d.name}</Card.Header>
                                <Card.Img fluid src={d.image} style={{
                                    maxHeight: 200,
                                    maxWidth: 200,
                                    backgroundColor: "white"
                                }} />
                            </Card>
                        </motion.div>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                </>
            ))}
            {filteredRecords.length > 0 ?
                <ul className="pagination">
                    <li className="page-item ">
                        <a style={{cursor:"pointer"}} className="page-link" onClick={prePage}>
                            Önce
                        </a>
                    </li>
                    {numbers.map((n, i) => (
                        <li
                            className={`page-item ${currentPage === n ? "active" : ""}`}
                            key={i}
                        >
                            <a style={{cursor:"pointer"}} className="page-link" onClick={() => changeCPage(n)}>
                                {n}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a style={{cursor:"pointer"}} className="page-link" onClick={nextPage}>
                            Sonra
                        </a>
                    </li>
                </ul>
                : ""}
        </DropdownButton>
    );
};

const imageanimations = {
    hidden: {
        opacity: 0,
        width: "80px",
    },
    show: {
        opacity: 1,
        width: "70px",
        transition: {
            ease: "easeInOut",
            duration: 0.8,
        },
    },
};

export default ActorsCombo;
