// @ts-ignore
import Marker from 'react-leaflet-enhanced-marker'
import {CSSProperties, FC, ReactElement, ReactNode} from 'react'
import {MarkerProps} from 'react-leaflet'

// @ts-ignore
interface IProps extends MarkerProps {
    icon?: ReactNode
}

export const MarkerEnchanced: FC<IProps> = ({
                                                children,
                                                icon,
                                                ...props
                                            }) => (
    <Marker
        icon={
            (<div style={{
                position:'relative',
                top:'6px',
                left:'29px'
            } as CSSProperties}>
                {icon}
            </div>)
        }
        {...props}>
        {children}
    </Marker>
)