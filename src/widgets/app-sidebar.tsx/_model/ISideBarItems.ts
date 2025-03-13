import { FC, SVGProps } from "react";

export interface IsideBarItems {
    title: string
    url: string
    icon?: FC<SVGProps<SVGSVGElement>>
}