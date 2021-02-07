import empty from "../../assets/empty.gif";

const Empty = () => {
	return (
		<div className="empty-container fadein">
			<figure>
				<img src={empty} alt="empty..." />
				<figcaption>No hay nada pendiente</figcaption>
			</figure>
		</div>
	);
};

export default Empty;
