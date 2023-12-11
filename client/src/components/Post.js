import React, { useEffect, useRef, useState } from 'react'
import { Card, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import MovieCard from './MovieCard1.js';
import { useNavigate } from 'react-router';
import { useImperativeHandle } from 'react';

const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

const Post = React.forwardRef((props, ref) => {
    const { post, movie, isADMIN, deletePost } = props;
    const useWindowWide = () => {
        const [width, setWidth] = useState(0);

        useEffect(() => {
            function handleResize() {
                setWidth(window.innerWidth);
            }

            window.addEventListener("resize", handleResize);

            handleResize();

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, [setWidth]);

        return width;
    };

    const windowWidth = useWindowWide();

    const navigate = useNavigate();

    const postBody = (
        <motion.div
            variants={animations}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
        >
            <Row className="container py-3"
                style={{ display: "flex", justifyContent: "space-between" }}>
                <Col md={10} lg={8} xs={12}>
                    <Row className='mb-4'></Row>
                    <Card className="mb-4" border="secondary" bg="light" text="dark">
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text
                                style={{
                                    textAlign: "justify",
                                }}>{post.body}</Card.Text>
                            <Card.Footer>Post ID: {post.id}</Card.Footer>
                            <Button hidden={!isADMIN} className='mx-1' color='success' rounded enabled
                                onClick={() => navigate(`/postEntry/${post._id}`)}
                            >
                                Posta Güncelle
                            </Button>
                            <Button hidden={!isADMIN} className='mx-1' color='danger' rounded enabled
                                onClick={() => deletePost(post)}
                            >
                                Posta Sil
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Row className='mb-4'>
                        <MovieCard movie={movie} />
                    </Row>
                </Col>
            </Row>
        </motion.div>
    )

    const content = ref
        ? <article ref={ref}>{postBody}</article>
        : <article>{postBody}</article>

    return content
})

export default Post