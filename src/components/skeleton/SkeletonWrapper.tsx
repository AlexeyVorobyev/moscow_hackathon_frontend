import {FC, ReactNode} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {SideNavigation} from "./SideBar/SideNavigation";
import {theme} from "../Theme/theme";
import {PageWrapper} from "./PageWrapper";
import {ErrorBoundary} from "./ErrorBoundary/ErrorBoundary";
import {PROJECT_NAME} from "../../globalVars";
import headerLogoIcon from './../../assets/logo/headerLogo.svg'

interface IProps {
    children: ReactNode
}

export const SkeletonWrapper: FC<IProps> = ({children}) => {

    return (
        <Box width={'100%'} height={'100%'}>
            <Box height={'70px'} sx={{
                background: theme.palette.primary.main,
                boxSizing: 'border-box',
                padding: theme.spacing(2),
                boxShadow: 2,
                zIndex:1000,
                position:'relative'
            }}>
                <Stack alignItems={'center'} direction={'row'} height={'100%'}>
                    <img src={headerLogoIcon} alt={PROJECT_NAME}/>
                    {/*<Typography variant={'h3'} color={theme.palette.primary.contrastText}>{PROJECT_NAME}</Typography>*/}
                </Stack>
            </Box>
            <Stack height={'calc(100vh - 70px)'} width={'100%'} direction={'row'}>
                <SideNavigation/>
                <Box sx={{flex: '1', height: '100%', width: '0'}}>
                    <ErrorBoundary>
                        {children}
                    </ErrorBoundary>
                </Box>
            </Stack>
        </Box>
    )
}

