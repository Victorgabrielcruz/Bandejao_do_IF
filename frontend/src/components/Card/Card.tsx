import { ChildCare } from "@mui/icons-material";

const Card = ({title, children}: {title: string, children: React.ReactNode}) => {
    return (
        <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            {children}
        </div>
    )
}

export default Card;