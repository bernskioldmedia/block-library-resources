export default function markerTemplate( markerData ) {

	return `
		<article className="marker-box">
			<div className="marker-box__wrap">
				<div className="marker-box__grid">
					<div className="marker-box__main">
						<span className="marker-box__title">${markerData.title}</span>
					</div>
				</div>
			</div>
		</article>
	`;

}
