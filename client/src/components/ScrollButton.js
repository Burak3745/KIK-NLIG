import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { motion } from "framer-motion";
export default function ScrollButton({ onClick, direction }) {
    return direction === 'left' ? (
        <motion.div initial={{opacity:0}} whileHover={{ opacity:1 }} style={{position:"absolute", left:"-60px", top:"110px"}}>
        <PiCaretLeftBold  id="left-scroll" className="scroll-btns" onClick={onClick} size={60} />
        </motion.div>
    ) : (
        <motion.div initial={{opacity:0}} whileHover={{ opacity:1 }} style={{position:"absolute", left:"1280px", top:"110px"}}>
        <PiCaretRightBold id="right-scroll" className="scroll-btns" onClick={onClick} size={60}  />
        </motion.div>
    );
}