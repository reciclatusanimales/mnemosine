import { cloneElement, useRef, useState } from "react";
import { createPortal } from "react-dom";

function Portal({ children }) {
	return createPortal(children, document.body);
}

const position = (p) => ({
	current: p,
	opposite() {
		if (this.current === "left") return "right";
		if (this.current === "right") return "left";
		if (this.current === "top") return "bottom";
		if (this.current === "bottom") return "top";
	},
	isHorizontal() {
		return this.current === "left" || this.current === "right";
	},
	isVertical() {
		return this.current === "top" || this.current === "bottom";
	},
});

const point = () => ({
	x: null,
	y: null,
	reset(p) {
		this.x = p.x;
		this.y = p.y;
	},
	restrictRect(rect) {
		if (this.x < rect.l) this.x = rect.l;
		else if (this.x > rect.r) this.x = rect.r;
		if (this.y < rect.t) this.y = rect.t;
		else if (this.y > rect.b) this.y = rect.b;
	},
});

function getPoint(el, tt, placement, space) {
	let recursiveCount = 0;
	const pt = point();

	const bound = {
		l: space,
		t: space,
		r: document.body.clientWidth - (tt.clientWidth + space),
		b: window.innerHeight - (tt.clientHeight + space),
	};
	const elRect = el.getBoundingClientRect();

	return (function recursive(placement) {
		recursiveCount++;
		const pos = position(placement);

		switch (pos.current) {
			case "left":
				pt.x = elRect.left - (tt.offsetWidth + space);
				pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
				break;
			case "right":
				pt.x = elRect.right + space;
				pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
				break;
			case "top":
				pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
				pt.y = elRect.top - (tt.offsetHeight + space);
				break;
			default:
				pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
				pt.y = elRect.bottom + space;
				break;
		}

		if (recursiveCount < 3) {
			if (
				(pos.isHorizontal() && (pt.x < bound.l || pt.x > bound.r)) ||
				(pos.isVertical() && (pt.y < bound.t || pt.y > bound.b))
			) {
				pt.reset(recursive(pos.opposite()));
			}
			pt.restrictRect(bound);
		}
		return pt;
	})(placement);
}

function Tooltip({
	text,
	placement = "bottom",
	space = 15,
	children,
	disabled = false,
	delay = 0.02,
}) {
	const [show, setShow] = useState(false);
	const positionRef = useRef({ x: 0, y: 0 });
	const tooltipRef = useRef(null);

	const handleMouseOver = (e) => {
		positionRef.current = getPoint(
			e.currentTarget,
			tooltipRef.current,
			placement,
			space
		);
		setShow(true);
	};

	const handleMouseOut = () => {
		setShow(false);
	};

	return (
		<>
			{disabled
				? children
				: cloneElement(children, {
						onMouseOver: handleMouseOver,
						onMouseOut: handleMouseOut,
				  })}
			{disabled || (
				<Portal>
					<span
						ref={tooltipRef}
						className={`Tooltip ${show ? "show" : ""}`}
						style={{
							top: `${positionRef.current.y}px`,
							left: `${positionRef.current.x}px`,
							transitionDelay: `${delay}s`,
							transformOrigin: `${position(
								placement
							).opposite()}`,
						}}
					>
						{text}
					</span>
				</Portal>
			)}
		</>
	);
}

export default Tooltip;
