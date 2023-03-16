export const InfoCard = (props: {
	title: string;
	percentage: number;
	counts: number;
}) => {
	return (
		<div key={props.title} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
			<dt className="truncate text-sm font-medium text-gray-500">{props.title}</dt>
			<div className="flex gap-2 justify-between">
				<dd className="mt-1 text-3xl font-bold tracking-tight text-gray-900">{props.counts}</dd>
				<dd className="mt-1 text-xl tracking-tight text-green-500">{props.percentage}%</dd>
			</div>
		</div>
	)
}