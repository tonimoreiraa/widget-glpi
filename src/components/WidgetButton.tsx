import { NavLink } from "react-router-dom";

interface WidgetButtonProps {
    title: string,
    route: string
}

function WidgetButton({title, route}: WidgetButtonProps)
{
    return <NavLink to={route} className="bg-neutral-800 hover:bg-neutral-700 p-4 rounded-lg flex items-center justify-center h-full cursor-pointer">{title}</NavLink>
}

export default WidgetButton;