import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel({
    inputType,
    inputID,
    label,
    placeholder,
    value,
    controlFn
}: {
    inputType: string;
    inputID: string;
    label: string;
    placeholder: string;
    value: string;
    controlFn?: Function;
}) {
    return (
        <div className="w-full flex flex-col gap-2">
            <Label htmlFor={inputID} className="text-white">{label}</Label>
            <Input
                type={inputType}
                id={inputID}
                value={value}
                onChange={(e) => controlFn !== undefined ? controlFn(e.currentTarget.value) : null}
                placeholder={placeholder}
                className="bg-slate-800 text-white placeholder:text-white"
            />
        </div>
    )
}

