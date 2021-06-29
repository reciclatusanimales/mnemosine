import { useState } from "react";

import { FaTimesCircle } from "react-icons/fa";

function Tags({ selected = () => {}, initialValue = [] } = {}) {
	const [tags, setTags] = useState(initialValue);
	const [tag, setTag] = useState("");

	const addTag = ({ key, keyCode }) => {
		if ((key === "Enter" || key === "Tab") && tag !== "") {
			const uniqueTags = new Set([...tags, tag]);
			setTags([...uniqueTags]);
			selected && selected([...uniqueTags]);
			setTag("");
		}
	};

	const removeTag = (index) => {
		const updatedTags = tags.filter((_, ind) => ind !== index);
		setTags(updatedTags);
		selected && selected(updatedTags);
	};

	return (
		<div className="Tags">
			{tags.length > 0 && (
				<ul>
					{tags.map((tag, index) => (
						<li key={index}>
							<span>{tag}</span>
							<FaTimesCircle onClick={() => removeTag(index)} />
						</li>
					))}
				</ul>
			)}
			<input
				type="text"
				placeholder="Press enter to add tags"
				onKeyUp={addTag}
				onKeyDown={addTag}
				value={tag}
				onChange={(e) => setTag(e.target.value)}
			/>
		</div>
	);
}

export default Tags;
