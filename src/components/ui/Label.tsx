type LabelProps = {
    htmlFor: string
    name: string
    required: boolean
};

export default function Label({ htmlFor, name, required }: Readonly<LabelProps>) {
    return (
        <label htmlFor={htmlFor} className="text-sm font-semibold">
            <span>{name}</span>
            {required && <span className="text-red-500">*</span>}
        </label>
    )
}